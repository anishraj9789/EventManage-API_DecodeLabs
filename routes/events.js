// routes/events.js
const express = require('express');
const router = express.Router();
const store = require('../data/store');
const { validateRegistration, validateEvent } = require('../middleware/validate');

// =====================
//    EVENT ROUTES
// =====================

// GET /api/events — Get all events
router.get('/', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'All events fetched successfully',
      count: store.events.length,
      data: store.events
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET /api/events/:id — Get single event by ID
router.get('/:id', (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    const event = store.events.find(e => e.id === eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: `Event with ID ${eventId} not found`
      });
    }

    res.status(200).json({ success: true, message: 'Event found', data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST /api/events — Create a new event
router.post('/', validateEvent, (req, res) => {
  try {
    const { eventName, date, venue, maxSeats } = req.body;

    const newEvent = {
      id: store.getNextEventId(),
      eventName: eventName.trim(),
      date,
      venue: venue.trim(),
      maxSeats: parseInt(maxSeats),
      registeredCount: 0
    };

    store.events.push(newEvent);

    res.status(201).json({
      success: true,
      message: 'Event created successfully!',
      data: newEvent
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// =====================
//  REGISTRATION ROUTES
// =====================

// POST /api/events/register/new — Register for an event
router.post('/register/new', validateRegistration, (req, res) => {
  try {
    const { studentName, email, rollNumber, phone, eventId } = req.body;

    const event = store.events.find(e => e.id === parseInt(eventId));
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found. Please check the Event ID.'
      });
    }

    if (event.registeredCount >= event.maxSeats) {
      return res.status(400).json({
        success: false,
        message: 'Sorry! No seats available for this event.'
      });
    }

    const alreadyRegistered = store.registrations.find(
      r => r.rollNumber === rollNumber.toUpperCase() && r.eventId === parseInt(eventId)
    );
    if (alreadyRegistered) {
      return res.status(400).json({
        success: false,
        message: 'You are already registered for this event!'
      });
    }

    const newRegistration = {
      registrationId: store.getNextRegId(),
      studentName: studentName.trim(),
      email: email.trim().toLowerCase(),
      rollNumber: rollNumber.trim().toUpperCase(),
      phone: phone.trim(),
      eventId: parseInt(eventId),
      eventName: event.eventName,
      registeredAt: new Date().toISOString()
    };

    store.registrations.push(newRegistration);
    event.registeredCount += 1;

    res.status(201).json({
      success: true,
      message: `Successfully registered for ${event.eventName}!`,
      data: newRegistration
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET /api/events/registrations/all — Get all registrations
router.get('/registrations/all', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: store.registrations.length === 0 ? 'No registrations yet' : 'All registrations fetched',
      count: store.registrations.length,
      data: store.registrations
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// GET /api/events/registrations/:rollNumber — Get by roll number
router.get('/registrations/:rollNumber', (req, res) => {
  try {
    const rollNumber = req.params.rollNumber.toUpperCase();
    const studentRegistrations = store.registrations.filter(
      r => r.rollNumber === rollNumber
    );

    if (studentRegistrations.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No registrations found for roll number ${rollNumber}`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Registrations found',
      count: studentRegistrations.length,
      data: studentRegistrations
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
