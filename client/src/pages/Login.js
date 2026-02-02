import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../layouts/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const userData = await login(email, password);
            if (userData.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Please enter your details to sign in."
        >
            <form onSubmit={onSubmit} className="space-y-6 mt-6">
                <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="name@company.com"
                    required
                />

                <div>
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="••••••••"
                        required
                    />
                    <div className="flex justify-end mt-1">
                        <Link to="/forgot-password" class="text-xs font-medium text-primary-600 hover:text-primary-500">
                            Forgot password?
                        </Link>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-100">
                        {error}
                    </div>
                )}

                <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    isLoading={isLoading}
                >
                    Sign In
                </Button>

                <p className="text-center text-sm text-secondary-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                        Sign up for free
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Login;
