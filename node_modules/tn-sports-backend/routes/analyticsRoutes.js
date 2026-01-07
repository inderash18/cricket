const express = require('express');
const router = express.Router();
const {
    getOverview,
    getUsersByDistrict,
    getUsersBySport,
    getMonthlyRegistrations
} = require('../controllers/analyticsController');
const { protect, admin } = require('../middleware/authMiddleware');

// Dashboard routes
router.get('/overview', getOverview);
router.get('/users-by-district', getUsersByDistrict);
router.get('/users-by-sport', getUsersBySport);
router.get('/monthly-registrations', getMonthlyRegistrations);

module.exports = router;
