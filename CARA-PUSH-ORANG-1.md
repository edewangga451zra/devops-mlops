# Cara Push Orang-1 (Isi Saja, Tanpa Folder)

Repo: `git@github.com:edewangga451zra/devops-mlops.git`
Hasil akhir di GitHub: 2 file di root, tanpa folder `orang-1/`:

- `bagian-1-core.js` — fondasi: helper, auth, stats, filter, render daftar
- `UPDATE-orang-1.md` — panduan + changelog bagianmu

`admin.html` jangan ikut push. Itu file bersama, owner yang gabung belakangan.
`tools/gabung-admin.js` juga jangan push. Itu alat gabung lokal jadi 1 web.

## Syarat sekali saja

1. Login sebagai `edewangga451zra`.
2. Buka `github.com/edewangga451zra/devops-mlops` → tab **Settings** → **Access > Collaborators** → **Add people** → ketik `ainunali310-afk` → role **Write** → kirim invite.
3. Kamu terima invite di `github.com/notifications`.
4. Cek SSH:
   `ssh -o BatchMode=yes -o ConnectTimeout=10 -T git@github.com`
   Harus balas `Hi ainunali310-afk! ...`.
5. Set identitas (sekali per clone):
   `git config user.name "ainunali310-afk"`
   `git config user.email "ainunali310-afk@users.noreply.github.com"`

## Langkah push tiap selesai edit

Jalankan dari folder `C:\xampp\htdocs\devops-mlops-push`:

1. Salin file terbaru dari web lokal ke folder push:
   `Copy-Item -Force ../photo-client-web/public/admin/orang-1/bagian-1-core.js .`
   `Copy-Item -Force ../photo-client-web/public/admin/orang-1/UPDATE.md ./UPDATE-orang-1.md`
2. Cek sintaks:
   `node --check bagian-1-core.js`
   Harus tanpa output (lolos).
3. Cek isi:
   `git status --short`
   Harus hanya `bagian-1-core.js` + `UPDATE-orang-1.md`. Tidak ada `.env`, `data/`, `uploads/`, token.
4. Stage + commit:
   `git add bagian-1-core.js UPDATE-orang-1.md`
   `git commit -m "orang-1: <isi singkat perubahan>"`
   Contoh: `git commit -m "orang-1: perbaiki klik statistik siap_edit"`.
5. Push:
   `git push origin main`
   Harus balas `main -> main`.
6. Verifikasi di web:
   Buka `github.com/edewangga451zra/devops-mlops/tree/main` → pastikan 2 file di root, tanpa folder.

## Kalau push ditolak

- `Permission denied to ainunali310-afk` → belum jadi collaborator Write. Minta owner ulang, terima invite, coba lagi.
- `Author identity unknown` → jalankan 2 perintah `git config` di atas, commit ulang.
- `Everything up-to-date` tapi file belum di GitHub → cek `git status --short`. Kalau masih `A` (staged) berarti belum commit. Commit dulu baru push.
- Tertukar push folder `orang-1/` → hapus dari GitHub:
  `git rm -r orang-1; git commit -m "orang-1: rapikan ke root tanpa folder"; git push origin main`

## Setelah semua orang push

Owner gabung lokal jadi 1 web:

1. Ambil 4 file sesuai nama orang ke `public/admin/orang-*/`.
2. `node tools/gabung-admin.js` → hasil `public/admin/admin.js`.
3. `node --check public/admin/admin.js`.
4. `node server.js`, buka `/admin`, muat ulang paksa `Ctrl+Shift+R`.
