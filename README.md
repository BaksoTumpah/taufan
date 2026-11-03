# Portofolio + panel /developer/

## A. GitHub Pages (sementara, bisa semuanya dari HP)
GitHub Free hanya mengizinkan Pages dari repo **public**. Isi repo hanya kode situs, jadi aman; token dan password tidak pernah disimpan di repo.

1. Buat repo **public** di GitHub (github.com > New). Jika namanya `USERNAME.github.io`, alamat situsnya `https://USERNAME.github.io/`; nama lain menjadi `https://USERNAME.github.io/NAMA-REPO/`.
2. Tambahkan 2 file: `index.html` (isi dari berkas ini) dan `developer/index.html` (Add file > Create new file, ketik `developer/index.html` sebagai nama, lalu tempel isinya). Folder `assets/` terbentuk otomatis saat kamu upload gambar atau mp3.
3. Repo > Settings > Pages > Source: **Deploy from a branch**, branch `main`, folder `/ (root)` > Save. Tunggu 1-2 menit.
4. Buat token: GitHub > Settings > Developer settings > Fine-grained tokens. Pilih hanya repo ini, izin **Contents: Read and write**, beri masa berlaku.
5. Buka `https://.../developer/`. Tidak ada login bawaan: saat pertama kali, tekan **Masuk** lalu buat username dan password baru (minimal 10 karakter, berlaku di semua perangkat setelah di-deploy). Setelah itu isi Owner, Repo, Branch, dan Token di bagian "Koneksi GitHub". Segera klik **Simpan & deploy** agar login baru terkunci di semua perangkat; sebelum itu, siapa pun yang membuka panel di browsernya sendiri bisa membuat login lokal (tanpa dampak ke situs, karena menulis ke situs butuh token).

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
- Pengunjung tidak bisa menulis apa pun ke situs. Login panel hanyalah penghalang di browser; pengaman sebenarnya adalah token GitHub (fine-grained, hanya repo ini, ada masa berlaku). Hash login (PBKDF2) bersifat publik di `content.json`, jadi pakai password panjang dan unik.
- Jangan pernah menaruh token, password, atau file service account di repo ini (`.gitignore` sudah menolak pola umumnya). Rahasia deploy hanya di GitHub > Settings > Secrets (`FIREBASE_SERVICE_ACCOUNT`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`).
- Foto dari kamera membawa metadata (lokasi GPS, model HP). Hapus EXIF sebelum mengunggah foto baru ke galeri.
- Header keamanan (CSP, anti-framing, nosniff, dll) dan cache diatur di `firebase.json`.

### Yang harus diatur di Firebase/Google Cloud (tidak bisa dari repo)
1. **Aturan Firestore**: tempel isi `firestore.rules` di Firebase Console > Firestore > Rules (ganti email admin), lalu Publish. Ini yang menahan bot spam komentar di sisi server.
2. **Batasi API key** (Google Cloud Console > APIs & Services > Credentials > Browser key): *Website restrictions* ke domain situs kamu, dan *API restrictions* hanya Cloud Firestore API dan Identity Toolkit API. Kunci web Firebase memang tampil di sisi pengunjung; pembatasan ini yang mencegah dipakai dari situs lain.
3. **App Check** (Firebase Console > App Check) dengan reCAPTCHA v3 untuk Firestore, agar hanya situs aslimu yang bisa menulis komentar. Kodenya sudah ada di `index.html` (kunci situs sudah terisi). Aktifkan dengan mengisi `appId` aplikasi web Firebase (Project settings > Your apps, bentuknya `1:123…:web:abc…`) di `content.json` pada `comments.appId`. Kunci API juga harus mengizinkan **Firebase App Check API**. Pantau dulu di App Check > APIs > Cloud Firestore sampai hampir semua permintaan berstatus *verified*, baru klik Enforce.
4. Matikan pendaftaran akun baru di Authentication (Settings > User actions) kalau hanya admin yang memakainya.
5. Aktifkan **Secret scanning + Push protection** di GitHub > Settings > Code security.
