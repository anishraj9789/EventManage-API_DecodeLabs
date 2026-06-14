// server.js
const express = require('express');
const app = express();
const eventRoutes = require('./routes/events');

// Middleware
app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '⚡ EventManage API is live!',
    version: '1.0.0',
    endpoints: {
      events: {
        getAllEvents:    'GET  /api/events',
        getSingleEvent: 'GET  /api/events/:id',
        createEvent:    'POST /api/events'
      },
      registrations: {
        register:           'POST /api/events/register/new',
        getAllRegistrations: 'GET  /api/events/registrations/all',
        getByRollNumber:    'GET  /api/events/registrations/:rollNumber'
      }
    }
  });
});

// Routes
app.use('/api/events', eventRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server!'
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('');
  console.log('  ⚡ EventManage API');
  console.log(`  🚀 Running on http://localhost:${PORT}`);
  console.log('');
});
