// bus_spammer.js
// Continuously sends requests to two APIs every 5 seconds without waiting for responses

const fs = require('fs');
const axios = require('axios');

const req1 = JSON.parse(fs.readFileSync('./req1.json', 'utf8'));

const endpoints = [
  {
    url: 'https://www.ashokatravels.net/api/cms_booking_engine.json',
    data: req1
  }
];

function fireAndForget(url, data) {
  axios.post(url, data).catch(() => {}); // Ignore errors and responses
}

setInterval(() => {
  endpoints.forEach(({ url, data }) => {
    fireAndForget(url, data);
    console.log(`[${new Date().toISOString()}] Sent request to ${url}`);
  });
}, 5000);

console.log('Bus spammer started. Sending requests every 5 seconds...');
