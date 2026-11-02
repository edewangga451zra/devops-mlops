# devops-mlops
# 📸 PhotoSelect — Platform Seleksi & Pengiriman Foto untuk Klien Fotografi

> Klien memilih foto terbaik lewat link dan kode akses, fotografer langsung melihat hasil pilihannya di dashboard, lalu mengirim foto hasil edit lewat website yang sama. Tanpa mencari file satu per satu.

![Status](https://img.shields.io/badge/status-in%20development-orange)
![License](https://img.shields.io/badge/license-MIT-blue)

<!-- Ganti dengan screenshot/GIF aplikasi Anda -->
![Preview](docs/preview.png)

---

## 📖 Tentang Proyek

**PhotoSelect** adalah aplikasi web yang mempermudah alur kerja fotografer dengan klien setelah sesi pemotretan.

Masalah yang diselesaikan:
- Klien memilih foto lewat chat/Drive, lalu fotografer harus mencari nama file satu per satu.
- Foto hasil edit dikirim terpisah dan sulit dilacak.

Solusinya: seluruh proses **pilih → edit → kirim** berjalan dalam satu website.

## 🔄 Alur Kerja

```
1. Fotografer upload foto hasil sesi ke website
        ↓
2. Sistem membuat LINK + KODE AKSES untuk klien
        ↓
3. Fotografer mengirim link & kode ke klien
        ↓
4. Klien membuka link, memasukkan kode, dan memilih foto terbaik
   (batas waktu pemilihan: 1 x 24 jam)
        ↓
5. Fotografer langsung melihat daftar foto terpilih di dashboard
   (tidak perlu mencari file manual)
        ↓
6. Fotografer mengedit foto terpilih
        ↓
7. Foto hasil edit diunggah ke website
        ↓
8. Klien mengunduh hasil akhir dari link yang sama
```

## ✨ Fitur Utama

### Sisi Fotografer (Admin)
- Upload foto sesi dalam jumlah banyak (drag & drop) per proyek/klien
- Generate **link unik + kode akses** untuk setiap klien
- Atur durasi pemilihan (default **24 jam**)
- Dashboard foto terpilih: lihat, filter, dan **unduh semua foto terpilih sekaligus (ZIP)**
- Daftar nama file terpilih (siap dipakai di Lightroom/Photoshop)
- Upload foto hasil edit ke proyek yang sama
- Status proyek: *Menunggu Pilihan → Sudah Dipilih → Proses Edit → Selesai*
- Perpanjang atau buka kembali masa pemilihan bila diperlukan

### Sisi Klien
- Akses galeri melalui link + kode akses (tanpa perlu membuat akun)
- Tampilan galeri responsif (nyaman dibuka dari HP)
- Pilih/tandai foto terbaik dengan satu klik
- Hitung mundur sisa waktu pemilihan
- Kirim pilihan final (setelah dikirim, pilihan dikunci)
- Unduh foto hasil edit (per foto atau ZIP)

### Keamanan
- Kode akses per proyek
- Link dan galeri otomatis tertutup setelah masa pemilihan berakhir
- Preview foto dengan watermark / resolusi rendah (opsional)

## 🛠️ Teknologi

> Sesuaikan dengan stack yang Anda gunakan.

| Bagian | Teknologi |
|---|---|
| Frontend | HTML, CSS, JavaScript / React |
| Backend | PHP (Laravel) / Node.js |
| Database | MySQL |
| Storage | Local Storage / Cloud Storage |

## 🚀 Instalasi

```bash
# 1. Clone repository
git clone https://github.com/username/photoselect.git
cd photoselect

# 2. Install dependency
npm install        # atau: composer install

# 3. Salin file environment
cp .env.example .env

# 4. Atur database & storage di file .env

# 5. Jalankan migrasi database
npm run migrate    # atau: php artisan migrate

# 6. Jalankan aplikasi
npm run dev        # atau: php artisan serve
```

## 🗄️ Rancangan Database (Ringkas)

| Tabel | Fungsi |
|---|---|
| `projects` | Data proyek/klien, kode akses, batas waktu, status |
| `photos` | Foto asli yang diunggah fotografer |
| `selections` | Foto yang dipilih klien |
| `edited_photos` | Foto hasil edit untuk klien |

## 🗺️ Roadmap

- [ ] Login admin fotografer
- [ ] Upload foto & pembuatan link + kode akses
- [ ] Halaman klien: pilih foto dengan batas 24 jam
- [ ] Dashboard foto terpilih + unduh ZIP
- [ ] Upload & unduh foto hasil edit
- [ ] Notifikasi email/WhatsApp saat klien selesai memilih
- [ ] Batas jumlah foto yang boleh dipilih per paket
- [ ] Komentar/catatan klien pada foto

## 🤝 Kontribusi

1. Fork repository ini
2. Buat branch: `git checkout -b fitur/nama-fitur`
3. Commit: `git commit -m "Tambah fitur X"`
4. Push: `git push origin fitur/nama-fitur`
5. Buat Pull Request

## 📄 Lisensi

MIT License. Lihat file [`LICENSE`](LICENSE).

## 📬 Kontak

**Nama Anda** — [email@example.com](mailto:email@example.com)
