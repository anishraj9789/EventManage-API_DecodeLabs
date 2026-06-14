// data/store.js
// Temporary in-memory database
// Data resets on server restart (no DB needed for this project)

let events = [
  {
    id: 1,
    eventName: "Tech Symposium 2026",
    date: "2026-07-15",
    venue: "Main Auditorium",
    maxSeats: 100,
    registeredCount: 0
  },
  {
    id: 2,
    eventName: "Hackathon Night",
    date: "2026-07-20",
    venue: "CS Lab Block",
    maxSeats: 50,
    registeredCount: 0
  }
];

let registrations = [];
let nextEventId = 3;
let nextRegId = 1;

module.exports = {
  events,
  registrations,
  getNextEventId: () => nextEventId++,
  getNextRegId: () => nextRegId++
};
