const jwt = require('jsonwebtoken');

const generateToken = (id, role, empId, name) => {
  return jwt.sign(
    { id, role, empId, name },
    process.env.JWT_SECRET || 'exim_2d_world_traders_super_secret_jwt_key_2026',
    { expiresIn: process.env.JWT_EXPIRE || '24h' }
  );
};

module.exports = generateToken;
