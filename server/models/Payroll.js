const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema(
  {
    month: {
      type: String,
      required: true,
      index: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    status: {
      type: String,
      enum: ['Disbursed', 'Pending Approval', 'Processing'],
      default: 'Disbursed',
    },
    disbursedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Payroll', payrollSchema);
