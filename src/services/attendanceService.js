import api from './api';

export const attendanceService = {
  getAttendanceLogs: async (params) => {
    const response = await api.get('/attendance', { params });
    return response.data;
  },
  clockIn: async (data) => {
    const response = await api.post('/attendance/clock-in', data);
    return response.data;
  },
  clockOut: async (data) => {
    const response = await api.post('/attendance/clock-out', data);
    return response.data;
  },
};
