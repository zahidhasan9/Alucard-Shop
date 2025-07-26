# 🛒 Alucard-Shop

Alucard-Shop is a full-featured MERN-based eCommerce platform that includes user authentication, product management, cart persistence, dynamic reviews, and a full order/invoice system. It supports real-time user sessions with seamless cart storage, making shopping experience smooth and secure.

---

## 🚀 Live Demo

**Frontend:** [https://app-fury-2k25.netlify.app](https://app-fury-2k25.netlify.app)  
**Backend:** _Link Will be added_

---

## ⚙️ Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** Session-based auth (cookie)
- **PDF Invoice:** `pdfkit` or custom invoice generator
- **Deployment:** Netlify (Frontend), [You can add Railway/Render/Heroku for backend]

---

## ✨ Features

### 👤 User Authentication & Session Management

- Register, login, logout, and forgot password support
- Session-based persistent login (no repeated logins needed)
- Password reset via secure token and email

### 🛒 Cart System with Database Sync

- Cart items are saved in the database for logged-in users
- Persistent cart: restored even after logout or device switch
- Real-time cart update (add, remove, update quantity)

### 🏠 User Dashboard

- **Address Book**
  - Add, edit, delete, and set a default shipping address
  - Default address auto-selected during checkout

- **Order Overview**
  - Track total orders placed, delivered, and reviews submitted

- **My Reviews**
  - View and manage your submitted product reviews
  - Click product from review to see full product details

- **Order History**
  - Track all orders with live status (e.g., Pending, Shipped, Delivered)
  - Download invoices as PDFs for each order

### 🧾 Invoice System

- Auto-generated invoices available per order
- Downloadable PDF format

### ⭐ Product Review System

- Submit, view, and delete personal reviews
- All reviews linked back to their product

---

## 📦 Installation

### 1. Clone the Repositories

```bash
git clone https://github.com/zahidhasan9/Alucard-Shop.git
git clone https://github.com/zahidhasan9/Alucard-Shop-Backend.git

2. Install Dependencies
Frontend

cd Alucard-Shop
npm install

cd Alucard-Shop-Backend
npm install


PORT=5000
MONGODB_URI=mongodb+srv://<your-db-url>
SESSION_SECRET=your_secret_key
BASE_URL=http://localhost:5000
