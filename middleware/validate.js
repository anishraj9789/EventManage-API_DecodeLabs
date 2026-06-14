// middleware/validate.js
// Input validation middleware — Never trust the client!

const validateRegistration = (req, res, next) => {
  const { studentName, email, rollNumber, phone, eventId } = req.body;
  const errors = [];

  if (!studentName || studentName.trim() === '') {
    errors.push('Student name is required');
  }

  if (!email || email.trim() === '') {
    errors.push('Email is required');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errors.push('Invalid email format');
  }

  if (!rollNumber || rollNumber.trim() === '') {
    errors.push('Roll number is required');
  }

  if (!phone || phone.trim() === '') {
    errors.push('Phone number is required');
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (phone && !phoneRegex.test(phone)) {
    errors.push('Phone must be exactly 10 digits');
  }

  if (!eventId) {
    errors.push('Event ID is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

const validateEvent = (req, res, next) => {
  const { eventName, date, venue, maxSeats } = req.body;
  const errors = [];

  if (!eventName || eventName.trim() === '') {
    errors.push('Event name is required');
  }

  if (!date) {
    errors.push('Event date is required');
  }

  if (!venue || venue.trim() === '') {
    errors.push('Venue is required');
  }

  if (!maxSeats || isNaN(maxSeats) || maxSeats <= 0) {
    errors.push('Max seats must be a positive number');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

module.exports = { validateRegistration, validateEvent };
