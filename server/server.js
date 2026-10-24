const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);
// Connect to MongoDB Database
connectDB();

const app = express();

// Security & Body Parser Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes Registration
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/departments', require('./routes/departmentRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/leave', require('./routes/leaveRoutes'));
app.use('/api/payroll', require('./routes/payrollRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    system: 'EXIM 2D World Traders HR ERP API Server',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Centralized Error Handling Middlewares
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
  🚀 ======================================================== 🚀
      EXIM 2D WORLD TRADERS — ENTERPRISE HR ERP BACKEND API
      Environment: ${process.env.NODE_ENV || 'development'}
      Listening at: http://localhost:${PORT}
      Health Check: http://localhost:${PORT}/api/health
  🚀 ======================================================== 🚀
  `);
});
