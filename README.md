# Yelp Restaurant Finder

An Angular web app that lets users search for restaurants in any city using the Yelp Fusion API.

## Approach

The app is split into two parts: a lightweight Node.js/Express proxy server (`proxy/`) and an Angular 17 frontend (`yelp-restaurants/`). The proxy is necessary because the Yelp Fusion API does not support browser-based requests (no CORS headers), so all API calls are made server-side and forwarded to the Angular app. The Angular app uses a standalone component architecture with a `YelpService` that calls the local proxy, and renders results as a responsive card grid showing name, rating, address, and coordinates.

## Accuracy & Edge Cases

- **City accuracy**: The Yelp search uses `location` (city name) combined with a `radius` of 8047 metres (~5 miles) and `term: 'restaurants'` with `sort_by: 'best_match'` to keep results relevant and within city limits.
- **Invalid city**: If Yelp returns a 400 (location not found), the proxy maps this to a clear user-facing error message rather than a raw API error.
- **Empty input**: The Search button is disabled until the user enters a non-whitespace city name.
- **Missing images**: Cards gracefully show a placeholder when no image is available from Yelp.
- **API key missing**: The proxy detects a missing or invalid API key and returns a descriptive error instead of crashing.

## Project Structure

```
Javascript YELP API/
├── proxy/                  # Node.js/Express proxy server
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── yelp-restaurants/       # Angular 17 app
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   ├── search-bar/
    │   │   │   └── restaurant-card/
    │   │   ├── models/
    │   │   │   └── restaurant.model.ts
    │   │   ├── services/
    │   │   │   └── yelp.service.ts
    │   │   ├── app.component.*
    │   ├── main.ts
    │   ├── index.html
    │   └── styles.css
    ├── angular.json
    └── package.json
```

## Prerequisites

- Node.js 18+
- npm 9+
- Angular CLI 17: `npm install -g @angular/cli`
- A Yelp Fusion API key — get one free at https://www.yelp.com/developers

## Setup & Run

### 1. Configure the proxy API key

```bash
cd proxy
cp .env.example .env
```

Edit `.env` and set your Yelp API key:

```
YELP_API_KEY=your_actual_api_key_here
PORT=3000
```

### 2. Start the proxy server

```bash
cd proxy
npm install
npm start
```

The proxy runs at `http://localhost:3000`.

### 3. Start the Angular app

In a new terminal:

```bash
cd yelp-restaurants
npm install
npm start
```

The app runs at `http://localhost:4200`. Open it in your browser, enter a city name, and click **Search**.
