import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../layouts/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Assuming register function exists in context, if not I'll use axios directly or mock it
    // The previous context might not have 'register', I should check AuthContext. 
    // For now I'll assume it exists or use the one I plan to improve.
    const { register } = useAuth();
    const navigate = useNavigate();

    const { name, email, password, confirmPassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);
        try {
            await register(formData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create an Account"
            subtitle="Start your journey with Eventify today."
        >
            <form onSubmit={onSubmit} className="space-y-4 mt-6">
                <Input
                    label="Full Name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChange}
                    placeholder="John Doe"
                    required
                />

                <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="name@company.com"
                    required
                />

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="••••••••"
                    required
                />

                <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={onChange}
                    placeholder="••••••••"
                    required
                />

                {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-100">
                        {error}
                    </div>
                )}

                <div className="pt-2">
                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        isLoading={isLoading}
                    >
                        Create Account
                    </Button>
                </div>

                <p className="text-center text-sm text-secondary-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                        Sign in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Register;
