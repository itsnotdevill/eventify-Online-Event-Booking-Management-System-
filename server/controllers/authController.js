const authService = require('../services/auth.service');

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
    try {
        const userData = await authService.register(req.body);
        res.status(201).json(userData);
    } catch (error) {
        // Map service errors to status codes if needed, or let global handler decide
        if (error.message === 'User already exists' || error.message === 'Please add all fields') {
            res.status(400);
        }
        next(error);
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userData = await authService.login(email, password);
        res.json(userData);
    } catch (error) {
        if (error.message === 'Invalid credentials') {
            res.status(401);
        }
        next(error);
    }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
    try {
        // req.user is set by authMiddleware, but we can verify against DB/Service if needed
        // For now, keep it simple or fetch fresh
        const user = await authService.getUserById(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe
};
