const Event = require('../models/Event');

const createEvent = async (req, res) => {
    const { title, sportType, location, district, eventDate } = req.body;
    try {
        const event = await Event.create({ title, sportType, location, district, eventDate });
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createEvent, getEvents };
