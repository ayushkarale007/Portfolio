# Ayush Karale Portfolio

A full-stack MERN portfolio website for Ayush Karale, built to showcase work experience, projects, skills, education, and contact details.

## Features

- Responsive dark/light portfolio UI inspired by the provided design
- Hero section with professional profile and CTA buttons
- Skills, projects, experience, education, and contact sections
- Secure Express API with MongoDB models
- JWT-protected admin routes
- Admin-ready project and content management architecture
- Contact form flow with validation and error handling

## Tech Stack

- Frontend: React + Vite + Tailwind + Framer Motion + React Router + Axios
- Backend: Node.js + Express + MongoDB + Mongoose + JWT + bcryptjs
- Tools: GitHub, Postman, VS Code

## Folder Structure

```bash
portfolio/
├── client/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed.js
│   ├── server.js
│   └── package.json
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── .env
```

## Installation

### Frontend

```bash
cd client
npm install
```

### Backend

```bash
cd server
npm install
```

## Environment Variables

Create a `.env` file at the project root and set:

```bash
MONGO_URI=mongodb://127.0.0.1:27017/portfolio
JWT_SECRET=your_secret_key
PORT=5000
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@portfolio.local
ADMIN_PASSWORD=admin123
NODE_ENV=development
```

## Run the App

```bash
cd portfolio
npm run dev
```

## Seed the Database

```bash
cd server
npm run seed
```

## Admin Login

Default seeded admin credentials:

- Email: admin@portfolio.local
- Password: admin123

## API Overview

- GET /api/projects
- POST /api/projects
- PUT /api/projects/:id
- DELETE /api/projects/:id
- GET /api/skills
- POST /api/skills
- GET /api/experience
- GET /api/education
- POST /api/contact
- POST /api/auth/login

## Deployment

- Deploy the backend to Render, Railway, or VPS
- Deploy the frontend to Vercel or Netlify
- Set environment variables in the deployment dashboard
- Configure MongoDB Atlas and update the MONGO_URI value
