// server.js

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/valorant/stats', async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  const apiKey = 'YOUR_TRACKER_NETWORK_API_KEY';
  const apiUrl = `https://api.tracker.gg/api/v2/valorant/standard/profile/riot/${username}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'TRN-Api-Key': apiKey,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData.message });
    }

    const data = await response.json();
    return res.json(data.data);
  } catch (error) {
    console.error('Error fetching Tracker Network data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
