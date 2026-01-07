const express = require('express');
const router = express.Router();
const {
    getOverview,
    getUsersByDistrict,
    getUsersBySport,
    getMonthlyRegistrations
} = require('../controllers/analyticsController');
const { protect, admin } = require('../middleware/authMiddleware');

// Dashboard routes usually protected for admin
router.get('/overview', protect, admin, getOverview);
router.get('/users-by-district', protect, admin, getUsersByDistrict);
router.get('/users-by-sport', protect, admin, getUsersBySport);
router.get('/monthly-registrations', protect, admin, getMonthlyRegistrations);

module.exports = router;
