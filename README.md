# 🚀 Bank Management System (React + .NET 9 API)

A complete full‑stack **Banking Management System** built using a modern tech stack — **React (Frontend)** and **.NET 9 Web API (Backend)** with JWT authentication, refresh tokens, dashboards, admin modules, and full banking operations.

---

## 🌟 Features

### 🎨 Frontend (React)

* Fully responsive modern UI
* JWT + Refresh Token Authentication
* Role‑based dashboards (Admin, Manager, Employee, Customer)
* User Management (CRUD)
* Account operations

  * Deposit
  * Withdraw
  * Transfer
  * Close Account
* Transaction History
* Admin Controls

  * Bank Management
  * Branch Management
  * User Roles
* Reusable shared components

  * Navbar
  * Sidebar
  * DataTable
  * Modals

### ⚙️ Backend (.NET 9 Web API)

* Secure JWT Auth + Refresh Token
* Entity Framework Core 9 + SQL Server
* Clean Controllers & DTOs
* Role & Permission Management
* Banking Modules:

  * Accounts
  * Transactions
  * Banks
  * Branches
  * Users
* Migration-based DB setup
* Production-ready architecture

---

## 📂 Project Folder Structure

### 🖥 Frontend (React)

```
/src
  App.js
  components/
    Home.jsx
    LoginParent.jsx
    UserManagement.jsx
    accounts/
    admin/
    shared/
    transactions/
  redux/
    userSlice.js
    accountsSlice.js
    transactionsSlice.js
  utils/
    api.js
    toast.js
```

### ⚙️ Backend (ASP.NET Core Web API)

```
/BankCustomerAPI
  Controllers/
  Data/
  Entities/
  Models/
  Services/
  Migrations/
  Program.cs
  appsettings.json
```

---

## 🛠 Installation & Setup

### ▶️ Backend Setup (.NET 9)

```bash
cd BankCustomerAPI
# Restore dependencies
dotnet restore

# Apply migrations
dotnet ef database update

# Run server
dotnet run
```

Backend runs at: **[https://localhost:7092](https://localhost:7092)**

---

### ▶️ Frontend Setup (React)

```bash
cd frontend/Project/project
npm install
npm start
```

Frontend runs at: **[http://localhost:3000](http://localhost:3000)**

---

## 📡 API Endpoints Summary

### 🔐 Authentication

* POST `/api/auth/login`
* POST `/api/auth/refresh`

### 👥 Users

* GET `/api/user`
* POST `/api/user`

### 🏦 Accounts

* POST `/api/accounts/create`
* POST `/api/accounts/deposit`
* POST `/api/accounts/withdraw`
* POST `/api/accounts/transfer`

### 💳 Transactions

* GET `/api/transactions/{userId}`

### 🏛 Bank & Branch

* GET `/api/banks`
* POST `/api/banks`
* GET `/api/branches`
* POST `/api/branches`

---

## 🖼 Screenshots

Screenshots for the application (already renamed to clean kebab-case filenames).

### 🔹 Login Page

![Login Page](screenshots/login-page.png)

### 🔹 Guest Homepage

![Guest Homepage](screenshots/guest-homepage.png)

### 🔹 User Homepage

![User Homepage](screenshots/user-homepage.png)

### 🔹 User Account Dashboard

![User Account Dashboard](screenshots/user-account-dashboard.png)

### 🔹 User Transaction History

![User Transaction History](screenshots/user-transaction-history.png)

### 🔹 Admin Homepage

![Admin Homepage](screenshots/admin-homepage.png)

### 🔹 Admin Dashboard

![Admin Dashboard](screenshots/admin-dashboard.png)

### 🔹 Admin User Management

![Admin User Management](screenshots/admin-user-management.png)

### 🔹 Bank & Branch Management

![Bank & Branch Management](screenshots/bank-branch-management.png)

### 🔹 Contact Page

![Contact Page](screenshots/contact-page.png)

### 🔹 Contact Support

![Contact Support](screenshots/contact-support.png)

### 🔹 About Page

![About Page](screenshots/about-page.png)

---

## 🧪 Running Tests

React Testing Library:

```bash
npm test
```

---

## 👨‍💻 Tech Stack

### Frontend

* React 18
* Redux Toolkit
* Axios
* CSS Modules

### Backend

* .NET 9 Web API
* Entity Framework Core 9
* SQL Server
* JWT + Refresh Token

---

## 📜 License

MIT

---

## ❤️ Author

Developed by **Sathish Kumar** — Training Project / Bank Management System.
