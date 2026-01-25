import { createContext, useState, useEffect, useContext } from 'react';
import apiClient from '../services/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // apiClient interceptor will attach token automatically
                    const res = await apiClient.get('/auth/me');
                    // Ensure we store token in user object if your app relies on user.token, 
                    // though typically user data and token are separate.
                    // Based on previous code, user object seemed to have token on login/register.
                    // Let's attach it for consistency.
                    setUser({ ...res.data, token });
                } catch (error) {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        checkUserLoggedIn();
    }, []);

    const login = async (email, password) => {
        // apiClient throws on error, caught by component
        const res = await apiClient.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        setUser(res.data);
        return res.data;
    };

    const register = async (userData) => {
        const res = await apiClient.post('/auth/register', userData);
        localStorage.setItem('token', res.data.token);
        setUser(res.data);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
