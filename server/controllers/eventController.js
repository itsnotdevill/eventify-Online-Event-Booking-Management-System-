const eventService = require('../services/event.service');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res, next) => {
    try {
        const events = await eventService.getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res, next) => {
    try {
        const event = await eventService.getEventById(req.params.id);
        res.status(200).json(event);
    } catch (error) {
        if (error.message === 'Event not found') res.status(404);
        next(error);
    }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = async (req, res, next) => {
    try {
        const event = await eventService.createEvent(req.body);
        res.status(201).json(event);
    } catch (error) {
        res.status(400); // Validation error usually
        next(error);
    }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = async (req, res, next) => {
    try {
        const updatedEvent = await eventService.updateEvent(req.params.id, req.body);
        res.status(200).json(updatedEvent);
    } catch (error) {
        if (error.message === 'Event not found') res.status(404);
        next(error);
    }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = async (req, res, next) => {
    try {
        const result = await eventService.deleteEvent(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        if (error.message === 'Event not found') res.status(404);
        next(error);
    }
};

module.exports = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};
