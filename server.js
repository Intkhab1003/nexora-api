const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Built-in Middleware: Parse incoming JSON request bodies
app.use(express.json());

// 2. Assignment Route 1: GET / -> Welcome Message in JSON
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    project: 'NEXORA API',
    version: '1.0.0',
    message: 'Welcome to NEXORA API! The Express.js server is online and operational.',
    internship: 'Webora Tec - Week 4 Task 1',
    author: 'Mian Intkhab (Khabii)',
    endpoints: {
      welcome: 'GET /',
      about: 'GET /about',
      dashboard: 'GET /dashboard'
    },
    timestamp: new Date().toISOString()
  });
});

// 3. Assignment Route 2: GET /about -> Short Project Description in JSON
app.get('/about', (req, res) => {
  res.status(200).json({
    success: true,
    name: 'NEXORA API',
    description: 'A lightweight RESTful API built with Node.js and Express.js featuring a futuristic real-time developer dashboard to test endpoints via Fetch API.',
    techStack: ['Node.js', 'Express.js', 'HTML5', 'CSS3', 'Vanilla JavaScript'],
    developer: 'Mian Intkhab (Khabii)',
    organization: 'Webora Tec Internship',
    status: 'Production Ready'
  });
});

// 4. Clean Dashboard Route: Serves public/index.html at /dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 5. Static File Serving: Serves CSS, JS, and assets from /public
app.use(express.static(path.join(__dirname, 'public')));

// 6. 404 Not Found Handler: Catches any undefined route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint Not Found',
    message: `The requested route ${req.method} ${req.originalUrl} does not exist on NEXORA API.`,
    availableEndpoints: ['GET /', 'GET /about', 'GET /dashboard']
  });
});

// 7. Global Error-Handling Middleware: Catches unexpected server errors
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: 'Something went wrong on the server.'
  });
});

// 8. Start the Server
app.listen(PORT, () => {
  console.log('====================================================');
  console.log(`🚀 NEXORA API Server running at http://localhost:${PORT}`);
  console.log(`📡 Welcome Endpoint : http://localhost:${PORT}/`);
  console.log(`📘 About Endpoint   : http://localhost:${PORT}/about`);
  console.log(`🖥️  UI Dashboard     : http://localhost:${PORT}/dashboard`);
  console.log('====================================================');
});