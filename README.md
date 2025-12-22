# 🏦 LoanLink - Smart Microloan Management System

**LoanLink** is a modern, full-stack microfinance platform designed to digitize the loan application and approval process. It provides a seamless experience for borrowers to apply for funds, while giving managers and admins powerful tools to track, review, and manage the entire loan lifecycle.

---

## 🔗 Project Resources

- **🌐 Live Deployment**: [Visit LoanLink](https://loanlink-app.netlify.app/)
- **📂 Backend API**: [Server Repository](https://github.com/RafiaMomota/loanlink-server)
- **📂 Frontend UI**: [Client Repository](https://github.com/RafiaMomota/loanlink-client)

---

## 🎨 Design Philosophy

The platform features a professional **Navy Blue & Light Green** theme, symbolizing trust, growth, and financial stability. It is fully responsive and supports a seamless **Dark/Light Mode** transition.

---

## 🛠️ Modern Tech Stack

### **Frontend**

- **React 19** & **Vite** (Core Framework)
- **Tailwind CSS 4** & **DaisyUI 5** (Styling & Themes)
- **TanStack React Query 5** (Server State Management)
- **Motion 12** (Smooth UI Transitions)
- **React Router 7** (Navigation)

### **Backend & Security**

- **Node.js & Express 5** (RESTful API)
- **MongoDB 7** (Database)
- **Firebase Authentication** (Identity Management)
- **JWT (JSON Web Tokens)** (Secure Authorization)
- **Stripe API** (Secure Payment Processing)

---

## ✨ Core Features

### 👤 For Borrowers (Users)

- **Streamlined Applications**: Simple forms to request loans with real-time status tracking.
- **Secure Payments**: Integrated Stripe gateway for application fees or repayments.
- **Personal Dashboard**: Comprehensive view of loan history and current balances.

### 👔 For Managers

- **Product Management**: Ability to create, update, or retire loan packages.
- **Decision Engine**: Review applications with the ability to approve/reject with feedback.
- **Visual Analytics**: Charts showing pending vs. approved loan metrics.

### 🛡️ For System Admins

- **Role Control**: Promote users to Managers or manage account status.
- **Global Oversight**: Full visibility into platform statistics and audit logs.
- **Content Curation**: Manage featured loan products on the homepage.

---

## 📦 Key Dependencies

| Category       | Tools Used                               |
| :------------- | :--------------------------------------- |
| **Frameworks** | React 19, Express 5                      |
| **Database**   | MongoDB 7                                |
| **Auth**       | Firebase, JWT                            |
| **Styling**    | Tailwind CSS 4, DaisyUI                  |
| **Icons & UI** | React Icons, SweetAlert2, React Spinners |
| **Data Viz**   | Chart.js, React-Chartjs-2                |

---

## 🚀 Local Setup Instructions

### 1. Prerequisites

Ensure you have **Node.js** and **npm** installed.

### 2. Client Setup

```bash
cd client-loanlink
npm install
# Create .env.local with your Firebase & Stripe keys
npm run dev
3. Server Setup
Bash

cd server-loanlink
npm install
# Create .env with MONGODB_URI and FB_SERVICE_KEY
node index.js
🔐 Security Standards
Environment Safety: All sensitive API keys and database URIs are managed via environment variables.

Route Guards: Private and Role-based routing prevents unauthorized access to Admin/Manager panels.

Data Integrity: Backend validation ensures only valid loan requests are processed.

👨‍💻 Developed By
Rafia Momota

https://github.com/rafiabubbles

Project completed as a showcase of Full-Stack MERN capabilities.

Created with ❤️ for a better microfinance experience.
```
