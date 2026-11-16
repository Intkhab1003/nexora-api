# NEXORA API

A lightweight, RESTful backend API built with **Node.js** and **Express.js**, paired with a futuristic glassmorphic developer dashboard for testing live HTTP endpoints in real time via the browser **Fetch API**.

Developed as **Week 4 — Task 1 (Basic API Welcome Route)** during the **Webora Tec** Web Development Internship.

---

## Features

- **RESTful JSON Endpoints:** Clean `GET /` and `GET /about` endpoints returning structured JSON payloads with explicit HTTP `200 OK` status codes.
- **Interactive Developer Console (`/dashboard`):** Dark-themed UI featuring cyan/purple gradients, CSS 3D floating server visuals, glassmorphism cards, and live `fetch()` endpoint testers.
- **Real-Time Response Inspection:** Displays live HTTP status codes, round-trip latency (`ms`), formatted JSON payloads, and one-click clipboard copy functionality.
- **Structured Error Handling:** Custom JSON `404 Not Found` route handler and global `500 Internal Server Error` middleware.
- **Zero-Database Lightweight Architecture:** Built strictly with Node.js, Express.js, HTML5, CSS3, and Vanilla JavaScript.

---

## Tech Stack

- **Runtime:** Node.js
- **Backend Framework:** Express.js
- **Development Utility:** Nodemon
- **Frontend:** HTML5, CSS3 (Glassmorphism & CSS 3D Animations), Vanilla JavaScript (`fetch()`)

---

## Project Structure

```text
nexora-api/
├── public/
│   ├── index.html      # Futuristic developer dashboard UI
│   ├── style.css       # Dark theme, gradients, glassmorphism & 3D server animations
│   └── script.js       # Asynchronous fetch() API tester, latency & clipboard logic
├── .gitignore          # Excludes node_modules and environment files
├── package.json        # Project metadata, scripts, and dependencies
├── README.md           # Setup, API documentation, and execution guide
└── server.js           # Express server, routes, static hosting & error middleware