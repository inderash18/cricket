const express = require('express');
const router = express.Router();
const { createEvent, getEvents } = require('../controllers/eventController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, admin, createEvent) // Only admin can create
    .get(getEvents); // Anyone can view

module.exports = router;
