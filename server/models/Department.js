const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    head: {
      type: String,
      required: true,
    },
    staffCount: {
      type: Number,
      default: 0,
    },
    budget: {
      type: String,
      default: '$1.2M',
    },
    status: {
      type: String,
      enum: ['Active', 'In Restructure'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Department', departmentSchema);
