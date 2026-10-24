const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    empId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Employee name is required'],
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Designation/Role is required'],
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      index: true,
    },
    status: {
      type: String,
      enum: ['Active', 'On Leave', 'Terminated', 'Probation'],
      default: 'Active',
    },
    location: {
      type: String,
      default: 'Rotterdam Port Hub',
    },
    phone: {
      type: String,
      default: '+1 (555) 019-2834',
    },
    salary: {
      type: Number,
      required: true,
      default: 4500,
    },
    photo: {
      type: String,
      default: '',
    },
    documents: [
      {
        name: String,
        url: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Employee', employeeSchema);
