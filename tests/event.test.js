const request = require('supertest');
const express = require('express');
const eventController = require('../controllers/event.controller');
const eventRoutes = require('../routes/event.routes');
const errorHandler = require('../middleware/errorHandler');


jest.mock('../controllers/event.controller', () => ({
  getAllEvents: jest.fn((req, res) => res.status(200).json({ status: 'success', data: [] })),
  getEventById: jest.fn(),
  createEvent: jest.fn(),
  updateEvent: jest.fn(),
  deleteEvent: jest.fn()
}));

const app = express();
app.use(express.json());
app.use('/api/events', eventRoutes);
app.use(errorHandler);

describe('Integration Tests - Event Endpoints', () => {
  test('GET /api/events should return list of events', async () => {
    const res = await request(app).get('/api/events');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
  });

  test('POST /api/events without token should fail with 401', async () => {
    const res = await request(app)
      .post('/api/events')
      .send({
        title: 'Test Event',
        date: '2026-10-10',
        location: 'Cairo',
        capacity: 100
      });

    expect(res.statusCode).toBe(401);
  });
});