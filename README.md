# URL Shortener

A modern URL shortening service built with React and Node.js with QR code generation capability.

## Features

- Shorten long URLs to manageable links
- Generate QR codes for shortened URLs
- Copy links to clipboard
- View and manage URL history
- Clean and modern UI with glassmorphism design
- Mobile responsive

## Tech Stack

### Frontend
- React with Vite
- Tailwind CSS for styling
- Axios for API requests
- QR Code generation using `qrcode.react`
- Local storage for URL history

### Backend
- Node.js with Express
- MongoDB with Mongoose
- Nanoid for generating unique codes
- CORS enabled
- Environment variables support

## Getting Started

### Prerequisites
- Node.js (latest LTS version)
- MongoDB installed and running locally
- Git

### Installation

1. Clone the repository
```sh
git clone <repository-url>
cd urlSortner
```

2. Setup Server
```sh
cd server
npm install
# Create .env file with your configurations:
# MONGO_URI=mongodb://127.0.0.1:27017/urlsortner
# BASE_URL=http://localhost:5000
npm start
```

3. Setup Client
```sh
cd client
npm install
npm run dev
```

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Enter a long URL in the input field
3. Click "Shorten" to generate a short URL
4. Use the "Copy" button to copy the shortened URL
5. Scan the QR code to open the URL on mobile devices
6. View your URL history below the main interface

## API Endpoints

- `POST /api/shorten` - Create a shortened URL
  - Body: `{ "originalUrl": "https://example.com" }`
  - Response: `{ "shortUrl": "http://localhost:5000/abc123" }`

- `GET /:shortcode` - Redirect to original URL

## Development

### Client
- Run development server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

### Server
- Start server: `npm start`
- The server runs on port 5000 by default

## Environment Variables

### Server (.env)
```
MONGO_URI=mongodb://127.0.0.1:27017/urlsortner
BASE_URL=http://localhost:5000
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

ISC License
