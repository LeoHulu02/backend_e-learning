# Backend (E-Learning API)

Backend REST API untuk aplikasi e-learning berbasis Node.js, Express, JWT authentication, dan MySQL.

## Fitur Utama

- Auth: register & login (JWT)
- RBAC (Role-Based Access Control): pembatasan akses berdasarkan role `admin` / `tutor` / user biasa
- Manajemen Kelas, Modul, dan Material
- Checkout & pembayaran (update status order)

## Tech Stack

- Node.js (ESM)
- Express
- MySQL (`mysql2/promise`)
- JWT (`jsonwebtoken`)
- Password hashing (`bcryptjs`)

## Prasyarat

- Node.js (LTS direkomendasikan)
- MySQL/MariaDB

## Instalasi

```bash
npm install
```

## Konfigurasi Environment

Buat file `.env` di root project (file ini sudah di-ignore oleh `.gitignore`).

Contoh:

```env
PORT=3000
JWT_SECRET=isi_dengan_secret_yang_kuat

DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=mission_db
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

- `http://localhost:<PORT>/`

## Autentikasi

Sebagian besar endpoint membutuhkan header:

```http
Authorization: Bearer <JWT_TOKEN>
```

Token dibuat saat login, dan payload token menyertakan `id`, `email`, dan `role`.

## RBAC (Role-Based Access Control)

Role yang digunakan:

- `admin`: akses penuh
- `tutor`: bisa mengelola resource pembelajaran (kelas/modul/material)
- user biasa: akses terbatas (misalnya melihat data dan transaksi milik sendiri)

Aturan penting:

- Endpoint write untuk `kelas`, `modul`, dan `material` dibatasi untuk `admin` dan `tutor`.
- `update/delete kelas` hanya bisa dilakukan oleh:
  - `admin`, atau
  - `tutor` pemilik kelas (`tutor_id` pada record kelas sama dengan `req.user.id`)
- Endpoint payment memvalidasi ownership order: non-admin hanya bisa memproses pembayaran order miliknya sendiri.

## API Endpoints

Base path: `/api`

### Auth

| Method | Path | Auth | Deskripsi |
|---|---|---:|---|
| POST | `/auth/register` | No | Registrasi user |
| POST | `/auth/login` | No | Login dan mendapatkan JWT |

### Kelas

| Method | Path | Auth | Role |
|---|---|---:|---|
| GET | `/kelas` | Yes | Any |
| GET | `/kelas/:id` | Yes | Any |
| POST | `/kelas` | Yes | `admin`, `tutor` |
| PUT | `/kelas/:id` | Yes | `admin`, `tutor` (owner untuk tutor) |
| DELETE | `/kelas/:id` | Yes | `admin`, `tutor` (owner untuk tutor) |

### Modul

| Method | Path | Auth | Role |
|---|---|---:|---|
| GET | `/modul/:kelas_id` | Yes | Any |
| POST | `/modul` | Yes | `admin`, `tutor` |
| PUT | `/modul/:id` | Yes | `admin`, `tutor` |
| DELETE | `/modul/:id` | Yes | `admin`, `tutor` |

### Material

| Method | Path | Auth | Role |
|---|---|---:|---|
| GET | `/material/modul/:modul_id` | Yes | Any |
| POST | `/material` | Yes | `admin`, `tutor` |
| PUT | `/material/:id` | Yes | `admin`, `tutor` |
| DELETE | `/material/:id` | Yes | `admin`, `tutor` |

### Order

| Method | Path | Auth | Deskripsi |
|---|---|---:|---|
| POST | `/orders/checkout` | Yes | Membuat order (status `pending`) |

### Payment

| Method | Path | Auth | Deskripsi |
|---|---|---:|---|
| POST | `/payment/bayar` | Yes | Memproses pembayaran order (update status `success`) |

Contoh request:

```json
{
  "order_id": 123
}
```

## Struktur Project

```
src/
  app.js
  config/
    db.js
  controllers/
  middlewares/
  models/
  routes/
```

Ringkasnya:

- `routes/`: definisi endpoint dan middleware (auth & RBAC)
- `controllers/`: handler request/response
- `models/`: query ke database
- `middlewares/`: `verifyToken` (JWT) dan `authorizeRole` (RBAC)

