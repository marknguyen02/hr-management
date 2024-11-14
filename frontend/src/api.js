import axios from 'axios';

// Tạo một instance của axios để cấu hình URL chung cho các yêu cầu API
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        'Content-Type': 'application/json',
    }
});

// Hàm đăng nhập
export const login = async (username, password) => {
    try {
        const response = await api.post('/login/', { username, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Login failed');
    }
};