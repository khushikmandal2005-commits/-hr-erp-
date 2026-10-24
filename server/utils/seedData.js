const dotenv = require('dotenv');
const connectDB = require('../config/db');
const User = require('../models/User');
const Employee = require('../models/Employee');
const Department = require('../models/Department');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing
    await User.deleteMany();
    await Employee.deleteMany();
    await Department.deleteMany();

    console.log('🧹 Existing collections cleared');

    // Create Initial Users
    const users = await User.create([
      {
        name: 'Alex Morgan',
        email: 'hr.admin@exim2d.com',
        password: 'password123',
        role: 'HR',
        empId: 'EXIM-1001',
        title: 'Global HR Administrator & Operations Lead',
      },
      {
        name: 'Sophia Martinez',
        email: 'sophia.m@exim2d.com',
        password: 'password123',
        role: 'EMPLOYEE',
        empId: 'EXIM-8092',
        title: 'Logistics Manager | Export & Trade Division',
      },
      {
        name: 'Sophia Martinez',
        email: 'employee@exim2d.com',
        password: 'password123',
        role: 'EMPLOYEE',
        empId: 'EXIM-8092',
        title: 'Logistics Manager | Export & Trade Division',
      },
    ]);

    console.log(`✅ Seeded ${users.length} Users`);

    // Seed Initial Employees
    const employees = await Employee.create([
      { empId: 'EXIM-8092', name: 'Sophia Martinez', role: 'Logistics Manager', email: 'sophia.m@exim2d.com', department: 'Export-Import Logistics', status: 'Active', location: 'Rotterdam Port Hub', salary: 4600 },
      { empId: 'EXIM-1001', name: 'Alex Morgan', role: 'Global HR Admin', email: 'alex.morgan@exim2d.com', department: 'Human Resources & Safety', status: 'Active', location: 'New York HQ', salary: 5800 },
      { empId: 'EXIM-3012', name: 'John Doe', role: 'Senior Civil Engineer', email: 'john.d@exim2d.com', department: 'Civil Engineering & Construction', status: 'Active', location: 'Expressway Project Alpha', salary: 5200 },
      { empId: 'EXIM-4091', name: 'Aisha Patel', role: 'Customs Officer', email: 'aisha.p@exim2d.com', department: 'Export-Import Logistics', status: 'On Leave', location: 'Singapore Hub', salary: 4100 },
      { empId: 'EXIM-5120', name: 'Liam O’Connor', role: 'Heavy Equipment Specialist', email: 'liam.o@exim2d.com', department: 'Heavy Equipment Operations', status: 'Active', location: 'Expressway Project Alpha', salary: 3900 },
    ]);

    console.log(`✅ Seeded ${employees.length} Workforce Employees`);

    // Seed Initial Departments
    const departments = await Department.create([
      { name: 'Civil Engineering & Construction', code: 'CIV-ENG', head: 'John Doe', staffCount: 48, budget: '$3.5M', status: 'Active' },
      { name: 'Export-Import Freight & Customs', code: 'EXIM-LOG', head: 'Sophia Martinez', staffCount: 34, budget: '$2.1M', status: 'Active' },
      { name: 'Heavy Equipment Operations', code: 'HEAVY-OPS', head: 'Liam O’Connor', staffCount: 24, budget: '$1.4M', status: 'Active' },
      { name: 'Finance & Procurement', code: 'FIN-ACC', head: 'Marcus Vance', staffCount: 20, budget: '$850K', status: 'Active' },
      { name: 'Human Resources & Safety', code: 'HR-SAFE', head: 'Alex Morgan', staffCount: 16, budget: '$600K', status: 'Active' },
    ]);

    console.log(`✅ Seeded ${departments.length} Divisions`);

    console.log('🎉 Database seeding completed successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedData();
