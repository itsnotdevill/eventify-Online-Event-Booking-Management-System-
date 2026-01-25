const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Helper: Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

const register = async (userData) => {
    const { name, email, password, role } = userData;

    if (!name || !email || !password) {
        throw new Error('Please add all fields');
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new Error('User already exists');
    }

    // Create user
    const user = await User.create({
        name,
        email,
        password,
        role: role || 'user'
    });

    if (user) {
        return {
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        };
    } else {
        throw new Error('Invalid user data');
    }
};

const login = async (email, password) => {
    // Check for user email
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
        return {
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        };
    } else {
        throw new Error('Invalid credentials');
    }
};

const getUserById = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

module.exports = {
    register,
    login,
    getUserById
};
