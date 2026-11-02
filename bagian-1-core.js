// Orang-1 — Fondasi + daftar order (UI saja, backend tidak diubah)
// Tanggung jawab: helper, state global, auth, statistik klik-filter,
// filter status + cari, render daftar, buka/tutup kartu, salin kode.
// Jangan ubah endpoint / field backend.
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = t => String(t ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
async function api(url, body) {
  const r = await fetch(url, { method: body ? 'POST' : 'GET', headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error(d.error || 'Terjadi kesalahan'), { status: r.status });
  return d;
}
const rp = n => 'Rp' + Number(n || 0).toLocaleString('id-ID');
const tgl = d => /^\d{4}-\d{2}-\d{2}$/.test(String(d || '').slice(0, 10))
  ? new Date(String(d).slice(0, 10) + 'T00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-';
const digits = w => { const d = String(w || '').replace(/[^0-9]/g, ''); return d.startsWith('0') ? '62' + d.slice(1) : d; };
const waTampil = n => String(n || '-').replace(/^(\d{4})(\d{4})(\d+)$/, '$1-$2-$3');
const CEK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>';

let ALL = [];
const OPEN = new Set();
const PENDING = {};
let RESET_ID = null;
let WA_OK = false;
const filter = { status: 'semua', q: '' };
const SIAP_EDIT = ['seleksi_selesai', 'proses_edit'];

function toast(t) {
  const el = $('#toast');
  el.textContent = t; el.classList.add('on');
  clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('on'), 2600);
}
async function busy(btn, fn) {
  const t = btn.innerHTML; btn.disabled = true; btn.textContent = 'Memproses…';
  try { await fn(); } finally { btn.disabled = false; btn.innerHTML = t; }
}
function sisa(o) {
  if (!o.galeri) return { t: 'Belum ada galeri', c: 'warn' };
  if (o.galeri.terkunci) return { t: 'Galeri terkunci', c: 'bad' };
  if (!o.galeri.aktifAt) return { t: 'Galeri belum aktif', c: 'warn' };
  const ms = o.galeri.sisaMs || 0;
  if (ms <= 0) return { t: 'Waktu habis', c: 'bad' };
  const d = Math.floor(ms / 864e5), h = Math.floor(ms % 864e5 / 36e5), m = Math.floor(ms % 36e5 / 6e4);
  const t = d > 0 ? `Sisa ${d} hari ${h} jam ${m} menit` : `Sisa ${h} jam ${m} menit`;
  return { t, c: ms <= 864e5 ? 'bad' : ms <= 3 * 864e5 ? 'warn' : 'ok' };
}
function cocok(o) {
  const f = filter.status;
  const s = f === 'semua'
    || (f === 'perlu_bayar' && (o.bayar || 0) < (o.harga || 0))
    || (f === 'siap_edit' && SIAP_EDIT.includes(o.status))
    || o.status === f;
  const q = filter.q.trim().toLowerCase();
  return s && (!q || o.klien.toLowerCase().includes(q) || String(o.id).toLowerCase().includes(q));
}

async function init() {
  try { const m = await api('/api/me'); if (m.role !== 'admin') throw 0; }
  catch { return location.href = '/login'; }
  try { const w = await api('/api/admin/wa-status'); WA_OK = !!w.configured; } catch { WA_OK = false; }
  await muat();
  $('#fStatus').onchange = e => { filter.status = e.target.value; renderStats(); render(); };
  $('#fCari').oninput = e => { filter.q = e.target.value; render(); };
  $('#fReset').onclick = () => { filter.status = 'semua'; filter.q = ''; $('#fStatus').value = 'semua'; $('#fCari').value = ''; renderStats(); render(); };
  $('#out').onclick = async e => { e.preventDefault(); await api('/api/logout', {}); location.href = '/'; };
  $('#dlgBatal').onclick = () => { RESET_ID = null; $('#dlg').close(); };
}
async function muat(keep) {
  try { ALL = await api('/api/admin/orders'); }
  catch (e) { return toast(e.message); }
  if (!keep && ALL.length && OPEN.size === 0) OPEN.add(ALL[0].id);
  renderStats(); render();
}
function renderStats() {
  const k = [
    ['semua', ALL.length, 'Total order'],
    ['perlu_bayar', ALL.filter(o => (o.bayar || 0) < (o.harga || 0)).length, 'Perlu bayar'],
    ['galeri_aktif', ALL.filter(o => o.status === 'galeri_aktif').length, 'Galeri aktif'],
    ['siap_edit', ALL.filter(o => SIAP_EDIT.includes(o.status)).length, 'Siap edit']
  ];
  $('#stats').innerHTML = k.map(([key, n, l]) =>
    `<button type="button" class="stat" data-stat="${key}" aria-pressed="${filter.status === key}"><b>${n}</b><span>${esc(l)}</span></button>`).join('');
  $$('#stats [data-stat]').forEach(b => b.onclick = () => { filter.status = b.dataset.stat; $('#fStatus').value = b.dataset.stat; renderStats(); render(); });
}
function render() {
  const list = ALL.filter(cocok);
  // kartu() milik Orang-2 (bagian-2-order.js). render() dipanggil setelah semua script termuat.
  $('#list').innerHTML = list.map(kartu).join('') || '<div class="kosong">Belum ada order yang cocok dengan filter.</div>';
}

// Aksi Orang-1: buka/tutup kartu + salin kode saja. Aksi lain milik Orang-2/3/4.
$('#list').addEventListener('click', async e => {
  const b = e.target.closest('[data-act]'); if (!b || b.disabled) return;
  const card = b.closest('.card'); const id = card?.dataset.id;
  const act = b.dataset.act;
  if (act === 'toggle') {
    OPEN.has(id) ? OPEN.delete(id) : OPEN.add(id);
    render(); return;
  }
  if (act === 'salin') {
    const o = ALL.find(x => x.id === id); if (!o) return;
    try { await navigator.clipboard.writeText(o.kode); toast('Kode disalin'); } catch { toast('Gagal menyalin'); }
    return;
  }
});
