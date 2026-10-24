export const COMPANY_NAME = 'EXIM 2D World Traders';
export const APP_TITLE = 'EXIM 2D World Traders HR ERP';
export const INDUSTRY_TAGLINE = 'Civil Engineering, Construction & Global Export-Import Management';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.exim2dworldtraders.com/v1';

export const APP_ROUTES = {
  HOME: '/',
  LOGIN_HR: '/login/hr',
  LOGIN_EMPLOYEE: '/login/employee',
  DASHBOARD_HR: '/dashboard/hr',
  DASHBOARD_EMPLOYEE: '/dashboard/employee',
  EMPLOYEES: '/employees',
  ATTENDANCE: '/attendance',
  LEAVE: '/leave',
  DEPARTMENTS: '/departments',
  PAYROLL: '/payroll',
  RECRUITMENT: '/recruitment',
  REPORTS: '/reports',
  PROFILE: '/profile',
  SETTINGS: '/settings',
};

export const USER_ROLES = {
  HR_ADMIN: 'HR_ADMIN',
  SITE_ENGINEER: 'SITE_ENGINEER',
  EXIM_OFFICER: 'EXIM_OFFICER',
  EMPLOYEE: 'EMPLOYEE',
};
