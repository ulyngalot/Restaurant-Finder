require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const YELP_API_KEY = process.env.YELP_API_KEY;

const allowedOrigins = [
  'http://localhost:4200',
  'https://ulyngalot.github.io',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());

app.get('/api/restaurants', async (req, res) => {
  const { city } = req.query;

  if (!city || !city.trim()) {
    return res.status(400).json({ error: 'City parameter is required.' });
  }

  if (!YELP_API_KEY) {
    return res.status(500).json({ error: 'Yelp API key is not configured.' });
  }

  try {
    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
      params: {
        term: 'restaurants',
        location: city.trim(),
        radius: 8047,
        limit: 20,
        sort_by: 'best_match',
      },
    });

    const restaurants = response.data.businesses.map((b) => ({
      id: b.id,
      name: b.name,
      rating: b.rating,
      reviewCount: b.review_count,
      address: b.location.display_address.join(', '),
      coordinates: {
        latitude: b.coordinates.latitude,
        longitude: b.coordinates.longitude,
      },
      imageUrl: b.image_url,
      categories: b.categories.map((c) => c.title).join(', '),
      isClosed: b.is_closed,
    }));

    res.json({ restaurants, total: response.data.total });
  } catch (err) {
    if (err.response?.status === 400) {
      return res.status(400).json({ error: 'City not found. Please enter a valid city name.' });
    }
    if (err.response?.status === 401) {
      return res.status(401).json({ error: 'Invalid Yelp API key.' });
    }
    res.status(500).json({ error: 'Failed to fetch restaurants. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`Yelp proxy server running at http://localhost:${PORT}`);
});
