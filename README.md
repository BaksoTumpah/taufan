# Portofolio + panel /developer/

## A. GitHub Pages (sementara, bisa semuanya dari HP)
GitHub Free hanya mengizinkan Pages dari repo **public**. Isi repo hanya kode situs, jadi aman; token dan password tidak pernah disimpan di repo.

1. Buat repo **public** di GitHub (github.com > New). Jika namanya `USERNAME.github.io`, alamat situsnya `https://USERNAME.github.io/`; nama lain menjadi `https://USERNAME.github.io/NAMA-REPO/`.
2. Tambahkan 2 file: `index.html` (isi dari berkas ini) dan `developer/index.html` (Add file > Create new file, ketik `developer/index.html` sebagai nama, lalu tempel isinya). Folder `assets/` terbentuk otomatis saat kamu upload gambar atau mp3.
3. Repo > Settings > Pages > Source: **Deploy from a branch**, branch `main`, folder `/ (root)` > Save. Tunggu 1-2 menit.
4. Buat token: GitHub > Settings > Developer settings > Fine-grained tokens. Pilih hanya repo ini, izin **Contents: Read and write**, beri masa berlaku.
5. Buka `https://.../developer/`, login `110610` / `110610`, ganti password, lalu isi Owner, Repo, Branch, dan Token di bagian "Koneksi GitHub".

Setelah itu semua edit (teks, foto, mp3, galeri) cukup dari `/developer/`, termasuk lewat HP. Klik **Simpan & deploy**; situs ter-update sekitar 1-3 menit kemudian.

## B. Firebase Hosting (opsional, nanti)
Pindahkan isi `firebase-opsional/` ke root repo (`deploy.yml` ke `.github/workflows/`), lalu ikuti `firebase init hosting:github`. Kodenya sama; tidak perlu diubah.

## Isi
- `photo` foto asli, `photoAlt` foto alternatif (klik foto di About untuk berganti; hover memunculkan bayangan samar).
- `education` dan `experience`: logo, nama, detail, periode.
- `flipEvery`: detik sebelum kartu membalik sendiri (0 = mati). `taglines`: pisahkan dengan koma.
- Tab yang kosong (misal Achievements) otomatis disembunyikan.

## Keamanan
- Token terenkripsi (AES-GCM) di browser dengan password kamu, tidak ada di repo. Cabut token di GitHub jika perangkat hilang.
- Pengunjung tidak bisa menulis apa pun. Jeda login hanya penghalang di browser; pengaman sebenarnya adalah token.
