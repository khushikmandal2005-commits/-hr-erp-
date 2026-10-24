# EXIM 2D World Traders — Enterprise HR ERP Backend API

A production-grade RESTful API backend built with **Node.js, Express.js, MongoDB, Mongoose, JWT, and Multer** following the **MVC Architecture**.

---

## 📁 Project Architecture & Folder Structure

```
server/
├── config/
│   └── db.js                 # MongoDB Mongoose connection
├── controllers/
│   ├── authController.js     # HR & Employee Login, Auth Profile
│   ├── employeeController.js # Employee CRUD, Search, Filter & Pagination
│   ├── departmentController.js # Departments & Divisions Management
│   ├── attendanceController.js # Biometric Site Attendance Clock In/Out
│   ├── leaveController.js    # Leave Requests & Approvals
│   ├── payrollController.js  # Payroll Calculation & Disbursal
│   └── dashboardController.js# Dashboard Statistics & KPIs
├── models/
│   ├── User.js               # Auth User Credentials (Bcrypt Hashed)
│   ├── Employee.js           # Workforce Personnel Schema
│   ├── Department.js         # Civil & Exim Divisions Schema
│   ├── Attendance.js         # Biometric Site Attendance Logs
│   ├── Leave.js              # Leave Applications & Approvals
│   └── Payroll.js            # Monthly Salary Disbursal
├── routes/
│   ├── authRoutes.js         # /api/auth
│   ├── employeeRoutes.js     # /api/employees
│   ├── departmentRoutes.js   # /api/departments
│   ├── attendanceRoutes.js   # /api/attendance
│   ├── leaveRoutes.js        # /api/leave
│   ├── payrollRoutes.js      # /api/payroll
│   └── dashboardRoutes.js    # /api/dashboard
├── middleware/
│   ├── authMiddleware.js     # JWT Guard & Role Authorization
│   ├── errorMiddleware.js    # Centralized Error Handling
│   └── uploadMiddleware.js   # Multer File & Document Upload
├── utils/
│   ├── generateToken.js      # JWT Token Helper
│   └── seedData.js           # Database Initial Seeder
├── uploads/                  # Static Storage for Uploaded Media
├── .env.example              # Sample Environment Variables
├── package.json              # Backend Dependencies
├── server.js                 # Express Application Entry Point
└── README.md                 # API Documentation & Guide
```

---

## ⚡ Quick Start & Setup Instructions

### 1. Installation
```bash
cd server
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/exim2d_hr_erp
JWT_SECRET=exim_2d_world_traders_super_secret_jwt_key_2026
JWT_EXPIRE=24h
FRONTEND_URL=http://localhost:5173
```

### 3. Seed Database
```bash
npm run seed
```

### 4. Run Development Server
```bash
npm run dev
```

---

## 📖 API Documentation & Endpoints

### 1. Authentication (`/api/auth`)

#### 🔑 `POST /api/auth/login`
- **Description**: Authenticate HR Admin or Employee.
- **Request Body**:
```json
{
  "email": "hr.admin@exim2d.com",
  "password": "password123",
  "portal": "hr"
}
```
- **Response** (`200 OK`):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d5ec49f1b2c80015f8e4a1",
    "name": "Alex Morgan",
    "email": "hr.admin@exim2d.com",
    "role": "HR",
    "empId": "EXIM-1001"
  }
}
```

---

### 2. Employee Management (`/api/employees`)

#### 📋 `GET /api/employees`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Query Params**: `?page=1&limit=10&search=Sophia&department=Export-Import Logistics`
- **Response** (`200 OK`):
```json
{
  "success": true,
  "count": 1,
  "total": 1,
  "page": 1,
  "pages": 1,
  "employees": [
    {
      "_id": "60d5ec49f1b2c80015f8e4a2",
      "empId": "EXIM-8092",
      "name": "Sophia Martinez",
      "email": "sophia.m@exim2d.com",
      "role": "Logistics Manager",
      "department": "Export-Import Logistics",
      "status": "Active",
      "location": "Rotterdam Port Hub",
      "salary": 4600
    }
  ]
}
```

#### ➕ `POST /api/employees`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>` (HR/Admin only)
- **Request Body** (`multipart/form-data`):
```json
{
  "name": "David Chen",
  "email": "david.chen@exim2d.com",
  "role": "Structural Engineer",
  "department": "Civil Engineering",
  "location": "Expressway Site Alpha",
  "salary": 5400
}
```

---

### 3. Biometric Attendance (`/api/attendance`)

#### ⏱️ `POST /api/attendance/clock`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response** (`200 OK`):
```json
{
  "success": true,
  "message": "Clocked In successfully at 09:00 AM",
  "log": {
    "id": "att-1722458000",
    "empId": "EXIM-8092",
    "empName": "Sophia Martinez",
    "date": "2026-07-31",
    "checkIn": "09:00 AM",
    "checkOut": null,
    "status": "Present"
  }
}
```

---

### 4. Leave Management (`/api/leave`)

#### 🌴 `POST /api/leave/apply`
- **Request Body**:
```json
{
  "type": "Annual Leave",
  "dates": "Aug 10 - Aug 14",
  "reason": "Family Vacation"
}
```

#### ✍️ `PATCH /api/leave/:id/status` (HR Only)
- **Request Body**:
```json
{
  "status": "Approved"
}
```

---

### 5. Executive Dashboard Stats (`/api/dashboard/stats`)

#### 📊 `GET /api/dashboard/stats`
- **Response** (`200 OK`):
```json
{
  "success": true,
  "stats": {
    "totalWorkforce": 142,
    "presentOnSite": 128,
    "attendanceRate": "90.1%",
    "pendingLeaves": 5,
    "activeDivisions": 6,
    "monthlyPayrollOutflow": "$248,500.00"
  }
}
```
