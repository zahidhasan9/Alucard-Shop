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




## 📡 API Reference

See all available endpoints here:

<details>
<summary><strong>Click to expand full API reference</strong></summary>

### 👤 User APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Log in user |
| `POST` | `/auth/logout` | Log out user |
| `GET`  | `/auth/me` | Get currently logged-in user |
| `PUT`  | `/auth/user` | Update profile |
| `PUT`  | `/auth/changepassword` | Change password |
| `POST` | `/auth/resetPasswordRequest` | Send password reset email |
| `POST` | `/auth/reset-password/:id/:token` | Reset password with token |
| `GET`  | `/user` | Get all users (admin only) |
| `GET`  | `/user/:id` | Get user by ID (admin only) |

---

### 🏠 Address APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/address/add` | Add address |
| `GET`  | `/address` | Get all addresses |
| `GET`  | `/address/type/:type` | Get address by type |
| `PUT`  | `/address/:id` | Update address |
| `DELETE` | `/address/:id` | Delete address |

---

### 🛍️ Product APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/product` | Get all products |
| `GET`  | `/product/:slug` | Get single product |
| `GET`  | `/product/featured` | Featured products |
| `GET`  | `/product/flashsell` | Flash sell products |
| `GET`  | `/product/top` | Top-rated products |
| `POST` | `/product` | Create product (admin) |
| `PUT`  | `/product/:id` | Update product |
| `DELETE` | `/product/:id` | Delete product |
| `POST` | `/product/:id/reviews` | Add review |

---

### 📂 Category APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/category` | Get categories |
| `POST` | `/api/categories` | Create category |
| `GET`  | `/api/categories/:id` | Get category by ID |
| `PUT`  | `/api/categories/:id` | Update category |
| `DELETE` | `/api/categories/:id` | Delete category |

---

### ✍️ Review APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/review` | Create review |
| `GET`  | `/review/:productId` | Get product reviews |
| `GET`  | `/review/user` | Get all user reviews |
| `DELETE` | `/review/me/:productId` | Delete own review |
| `DELETE` | `/review/:reviewId` | Delete any review (admin) |

---

### 🛒 Cart APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/cart` | Get cart |
| `POST` | `/cart/add` | Add item |
| `PUT`  | `/cart/update` | Update quantity |
| `DELETE` | `/cart/remove/:productId` | Remove item |

---

### 📦 Order APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/order` | Create order |
| `GET`  | `/order/my-orders` | User orders |
| `GET`  | `/order/last-orders` | Last order |
| `GET`  | `/order/:orderId` | Get order by ID |
| `PUT`  | `/order/:orderId/pay` | Pay for order |
| `PUT`  | `/order/:orderId/deliver` | Mark delivered (admin) |
| `GET`  | `/orders` | All orders (admin) |

</details>

---

## 🛠️ Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change or improve.

---

## 📧 Contact

**Developer:** Jahid Hasan Rimel  
📩 zmzahidhasan181@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/jahid-hasan-rimel)

---

## 📜 License

This project is licensed under the MIT License — feel free to use and adapt for your own eCommerce needs.


PORT=5000
MONGODB_URI=mongodb+srv://<your-db-url>
SESSION_SECRET=your_secret_key
BASE_URL=http://localhost:5000
