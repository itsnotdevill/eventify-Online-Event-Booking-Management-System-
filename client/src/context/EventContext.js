import { createContext, useState, useEffect, useCallback } from 'react';
import apiClient from '../services/apiClient';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEvents = useCallback(async () => {
        setLoading(true);
        try {
            const res = await apiClient.get('/events');
            setEvents(res.data);
            setError(null);
        } catch (err) {
            // Error handled globally by apiClient, but we capture for local state
            setError(err.response?.data?.message || 'Error fetching events');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchEventById = async (id) => {
        try {
            const res = await apiClient.get(`/events/${id}`);
            return res.data;
        } catch (err) {
            throw err;
        }
    };

    const createEvent = async (eventData) => {
        // Token attached automatically
        const res = await apiClient.post('/events', eventData);
        setEvents([...events, res.data]);
        return res.data;
    };

    const deleteEvent = async (id) => {
        await apiClient.delete(`/events/${id}`);
        setEvents(events.filter(event => event._id !== id));
    };

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    return (
        <EventContext.Provider value={{
            events,
            loading,
            error,
            fetchEvents,
            fetchEventById,
            createEvent,
            deleteEvent
        }}>
            {children}
        </EventContext.Provider>
    );
};

export default EventContext;
