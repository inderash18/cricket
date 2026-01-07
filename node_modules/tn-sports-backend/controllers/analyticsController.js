const User = require('../models/User');
const Event = require('../models/Event');

const getOverview = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalEvents = await Event.countDocuments();

        // Sum of all registered users across all events
        const eventRegistrations = await Event.aggregate([
            { $project: { count: { $size: "$registeredUsers" } } },
            { $group: { _id: null, total: { $sum: "$count" } } }
        ]);

        res.json({
            totalUsers,
            totalEvents,
            totalRegistrations: eventRegistrations[0]?.total || 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsersByDistrict = async (req, res) => {
    try {
        const stats = await User.aggregate([
            { $group: { _id: "$district", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsersBySport = async (req, res) => {
    try {
        const stats = await User.aggregate([
            { $group: { _id: "$favouriteSport", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMonthlyRegistrations = async (req, res) => {
    try {
        const stats = await User.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getOverview,
    getUsersByDistrict,
    getUsersBySport,
    getMonthlyRegistrations
};
