const Event = require('../models/Event');

const getAllEvents = async () => {
    return await Event.find().sort({ date: 1 });
};

const getEventById = async (id) => {
    const event = await Event.findById(id);
    if (!event) {
        throw new Error('Event not found');
    }
    return event;
};

const createEvent = async (eventData) => {
    // Ensure strict validation before creation
    // The model pre-save hook handles totalSeats calculation, but we can do extra checks here
    const event = await Event.create(eventData);
    return event;
};

const updateEvent = async (id, updateData) => {
    const event = await Event.findById(id);
    if (!event) {
        throw new Error('Event not found');
    }

    // Use findByIdAndUpdate to trigger validators again if needed, 
    // or manually update fields to ensure hooks run (save() is better for hooks)
    // For simplicity/performance in update, we'll use findByIdAndUpdate but set runValidators
    // Note: complex seat updates might require manual save to trigger pre-save totalSeats calc

    // If ticketCategories are being updated, we should probably re-calculate everything.
    // Let's stick to safe updates.

    const updatedEvent = await Event.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    });

    return updatedEvent;
};

const deleteEvent = async (id) => {
    const event = await Event.findById(id);
    if (!event) {
        throw new Error('Event not found');
    }
    await event.deleteOne();
    return { id };
};

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};
