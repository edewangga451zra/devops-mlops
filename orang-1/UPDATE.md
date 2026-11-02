# Orang-1 — Fondasi + Daftar Order

## Tugas
- Helper global: `$`, `$$`, `esc`, `api`, `rp`, `tgl`, `digits`, `waTampil`, `CEK`.
- State global: `ALL`, `OPEN`, `PENDING`, `RESET_ID`, `WA_OK`, `filter`, `SIAP_EDIT`.
- Auth: `init()` cek `/api/me`, redirect `/login` bila bukan admin.
- Data: `muat()` ambil `GET /api/admin/orders`, buka kartu pertama otomatis.
- Statistik klik-filter: `renderStats()` — Total, Perlu bayar, Galeri aktif, Siap edit.
- Filter: `fStatus`, `fCari`, `fReset`.
- Render daftar: `render()` panggil `kartu()` milik Orang-2.
- Aksi: `toggle` buka/tutup kartu, `salin` salin kode.

## File
- `bagian-1-core.js` — file ini, wajib dimuat pertama.
- Dipakai oleh: Orang-2 (`kartu`), Orang-3 (`galeriHtml`, `sisa`), Orang-4 (`waHtml`, `init`).
- Urutan di `admin.html`: 1-core → 2-order → 3-galeri → 4-wa.

## Endpoint dipakai
- `GET /api/me`
- `GET /api/admin/orders`
- `GET /api/admin/wa-status` (cek status saja, kirim milik Orang-4)
- `POST /api/logout`

## Cara jalan lokal
1. `node server.js`
2. Login `/login` sebagai `admin`.
3. Buka `/admin`.

## Cara tes
- Statistik angka berubah ikut data.
- Klik statistik ubah filter + isi dropdown ikut.
- Cari nama / ID filter daftar.
- Reset kembalikan `semua` + kosongkan cari.
- Toggle buka/tutup kartu.
- Salin kode → toast `Kode disalin`.

## Changelog
- 2026-11-02: Pecah dari `admin.js` tunggal jadi 4 modul. Core pindah ke sini tanpa ubah logika.
- 2026-11-02: Perbaiki klik statistik: dropdown ikut nilai diklik (`siap_edit` tidak lagi mental ke `semua`).
- 2026-11-02: Hapus duplikat binding `dlgOk` dari core, pindah ke Orang-3 biar 1 handler.
- Aturan: UI saja. Jangan ubah field / endpoint backend.
