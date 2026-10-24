import api from './api';

export const leaveService = {
  getLeaveRequests: async (params) => {
    const response = await api.get('/leave-requests', { params });
    return response.data;
  },
  applyLeave: async (data) => {
    const response = await api.post('/leave-requests', data);
    return response.data;
  },
  updateLeaveStatus: async (id, status) => {
    const response = await api.patch(`/leave-requests/${id}`, { status });
    return response.data;
  },
};
