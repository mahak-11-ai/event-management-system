# Event Management System

A backend API for an Event Management System built using Node.js, Express.js, MongoDB, Express, Multer, Cloudinary, and React (Vite).

## Features

- User Authentication
- Create Events
- Upload Event Banner Images
- Cloudinary Image Storage
- Admin Approval Workflow
- MongoDB Database
- REST API

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- Cloudinary
- JWT

### Frontend
- React
- Vite

## Folder Structure

```
project/
│
├── client/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── model/
│   ├── routes/
│   └── utils/
```

## Installation

Clone the repository

```bash
git clone https://github.com/mahak-11-ai/event-management-system.git
```

Go to the project

```bash
cd event-management-system
```

Install backend dependencies

```bash
cd server
npm install
```

Install frontend dependencies

```bash
cd ../client
npm install
```

Run Backend

```bash
npm run dev
```

Run Frontend

```bash
npm run dev
```

## Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=3000
MONGODB_URL=your_mongodb_url

JWT_SECRET=your_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## API Endpoints

### Authentication

- POST `/api/v1/auth/register`
- POST `/api/v1/auth/login`

### Events

- GET `/api/v1/events`
- POST `/api/v1/events`

## Future Improvements

- Event Registration
- Admin Dashboard
- Search & Filters
- Email Notifications
- Payment Integration

## Author

**Mahak Nihalani**

GitHub: https://github.com/mahak-11-ai