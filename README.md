# Backend E-Learning (Express + MySQL)

Backend REST API untuk aplikasi E-Learning, dibangun dengan Express.js dan MySQL. Project ini menyediakan autentikasi berbasis JWT, manajemen kelas/modul/material, serta flow order dan pembayaran sederhana.

## Fitur Utama
- Autentikasi pengguna: register & login (JWT)
- Proteksi endpoint dengan middleware JWT (`Authorization: Bearer <token>`)
- CRUD Kelas
- CRUD Modul (berdasarkan Kelas)
- CRUD Material (berdasarkan Modul)
- Checkout Order (membuat order + order item dengan transaksi)
- Proses pembayaran (update status order)

## Tech Stack
- Node.js (ESM / `"type": "module"`)
- Express.js
- MySQL (`mysql2/promise`)
- JWT (`jsonwebtoken`)
- Password hashing (`bcryptjs`)
- `dotenv`, `cors`
- Dev tooling: `nodemon`

## Struktur Folder
project-root
│
├── node_modules
│
├── src
│   │
│   ├── config
│   │
│   ├── controllers
│   │   ├── authController.js
│   │   ├── kelasController.js
│   │   ├── materialController.js
│   │   ├── modulController.js
│   │   ├── orderController.js
│   │   └── paymentController.js
│   │
│   ├── middlewares
│   │   └── authMiddleware.js
│   │
│   ├── models
│   │   ├── kelasModel.js
│   │   ├── materialModel.js
│   │   ├── modulModel.js
│   │   ├── orderModel.js
│   │   └── userModel.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── kelasRoutes.js
│   │   ├── materialRoutes.js
│   │   ├── modulRoutes.js
│   │   ├── orderRoutes.js
│   │   └── paymentRoutes.js
│   │
│   └── app.js

## Prasyarat
- Node.js 18+ (disarankan terbaru)
- MySQL 8+ (atau kompatibel)
- npm

## Instalasi
1. Clone repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Siapkan database MySQL dan tabel (lihat bagian “Database”)
4. Buat file `.env` di root project

## Environment Variables
Buat file `.env` (sudah di-ignore oleh `.gitignore`) dengan contoh berikut:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=elearning_db

JWT_SECRET=change_this_to_a_strong_secret
```

## Menjalankan Aplikasi
Mode development (auto-reload):
```bash
npm run dev
```

Mode production:
```bash
npm start
```

Server akan berjalan di:
- `http://localhost:3000`

Health check:
- `GET /` → `Server E-Learning sudah berjalan!`

## Autentikasi (JWT)
Sebagian besar endpoint membutuhkan header:

Token didapat dari endpoint login.

## API Endpoints

### Auth (Public)
- `POST /api/auth/register`
  - Body:
    ```json
    { "name": "Nama", "email": "user@mail.com", "password": "password" }
    ```
- `POST /api/auth/login`
  - Body:
    ```json
    { "email": "user@mail.com", "password": "password" }
    ```
  - Response berisi `token`.

### Kelas (Protected)
Base URL: `/api/kelas`
- `GET /api/kelas` → list kelas
- `GET /api/kelas/:id` → detail kelas
- `POST /api/kelas` → tambah kelas
  - Body:
    ```json
    { "name": "Kelas A", "deskripsi": "Deskripsi", "harga": 100000, "kategori_id": 1 }
    ```
- `PUT /api/kelas/:id` → update kelas
- `DELETE /api/kelas/:id` → hapus kelas

Catatan: `tutor_id` diambil dari `req.user.id` (hasil verifikasi JWT).

### Modul (Protected)
Base URL: `/api/modul`
- `POST /api/modul`
  - Body:
    ```json
    { "name": "Modul 1", "kelas_id": 1 }
    ```
- `GET /api/modul/:kelas_id` → list modul dalam kelas
- `PUT /api/modul/:id`
  - Body:
    ```json
    { "name": "Modul Baru" }
    ```
- `DELETE /api/modul/:id`

### Material (Protected)
Base URL: `/api/material`
- `POST /api/material`
  - Body:
    ```json
    { "name": "Materi 1", "tipe": "video", "url": "https://...", "modul_id": 1 }
    ```
- `GET /api/material/modul/:modul_id` → list material dalam modul
- `PUT /api/material/:id`
  - Body:
    ```json
    { "name": "Materi Baru", "tipe": "pdf", "url": "https://..." }
    ```
- `DELETE /api/material/:id`

### Orders (Protected)
Base URL: `/api/orders`
- `POST /api/orders/checkout`
  - Body:
    ```json
    { "total_harga": 100000, "kelas_id": 1 }
    ```
  - Membuat data di tabel `orders` dan `orders_item` (transaksi).

### Payment (Protected)
Base URL: `/api/payment`
- `POST /api/payment/bayar`
  - Body:
    ```json
    { "order_id": 1 }
    ```
  - Mengubah status order menjadi `success`.

## Database
Project ini mengasumsikan tabel berikut tersedia:
- `users` (`id`, `name`, `email`, `password`, ...)
- `kategori` (`id`, `name`, ...)
- `kelas` (`id`, `name`, `deskripsi`, `harga`, `kategori_id`, `tutor_id`, ...)
- `modul` (`id`, `name`, `kelas_id`, ...)
- `material` (`id`, `name`, `tipe`, `url`, `modul_id`, ...)
- `orders` (`id`, `users_id`, `total_price`, `status`, ...)
- `orders_item` (`id`, `orders_id`, `kelas_id`, `price`, `quantity`, ...)

Silakan sesuaikan schema dan foreign key sesuai kebutuhan aplikasi.

## Lisensi
ISC
