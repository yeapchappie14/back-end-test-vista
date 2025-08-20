# Back-end Test (Node + TypeScript + Prisma + MySQL)

A tiny REST API for managing **Companies** and their **Services**.

## Features
- Node.js + Express + TypeScript
- Prisma ORM (MySQL)
- DTOs + validation (`express-validator`)
- Simple request logging middleware
- 4 required endpoints:
  - `POST /companies`
  - `GET  /companies`
  - `POST /services`
  - `GET  /services/:id`

---

## Tech Stack
- Node 18+
- TypeScript
- Express
- Prisma + MySQL 8
- dotenv, cors

---

## Requirements
- **MySQL 8** running on `localhost:3306`
- **Node 18+** (`node -v`)
- (Windows PowerShell is fine)

---

## Quick Start (Windows)

```powershell
# 1) Clone
git clone https://github.com/yeapchappie14/back-end-test-vista.git
cd back-end-test-vista

# 2) Install deps
npm install

# 3) Create .env from example and set your MySQL password
copy .env.example .env
# then open .env and set:
# DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/testdb"
# PORT=4000

# 4) Create DB schema
npx prisma migrate dev --name init
# (or: npx prisma db push)

# 5) Run the API
npm run dev
# -> API running at http://localhost:4000
