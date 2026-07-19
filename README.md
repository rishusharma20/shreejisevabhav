# Shreeji Seva Bhav V1

Welcome to the Shreeji Seva Bhav platform. This is a fully functional, premium-designed, and production-ready e-commerce platform built to manage divine offerings, payments, collections, and administrative capabilities.

## Architecture

This repository contains both the Frontend and the Backend of the platform.

### Frontend
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS & Vanilla CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion

### Backend
- **Framework**: Express.js (Node.js)
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **File Uploads**: Multer (Local Storage)

---

## Getting Started (Local Development)

### Prerequisites
- Node.js (v18+)
- MongoDB running locally or a MongoDB Atlas URI.

### 1. Backend Setup
Navigate into the backend directory, install dependencies, configure environment variables, and start the development server.

```bash
cd backend
npm install

# Create the environment file based on the template
cp .env.example .env

# Edit .env and ensure your MongoDB URI and secrets are set up correctly.

# Run the development server
npm run dev
```

### 2. Frontend Setup
Open a new terminal window, navigate to the root directory, install dependencies, configure the environment, and start the development server.

```bash
npm install

# Create the environment file
cp .env.example .env

# The default API URL is pointing to your local backend.
# NEXT_PUBLIC_API_URL=http://localhost:8000

# Run the frontend server
npm run dev
```

---

## Deployment (Production Ready)

To deploy the application to a production server (such as Vercel, Railway, AWS, or DigitalOcean), follow these steps.

### Backend Deployment
1. Set the environment variable `NODE_ENV=production`.
2. Ensure you have a secure `MONGODB_URI`.
3. Generate strong random strings for `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET`.
4. Run the production start command:
```bash
npm install
npm run start
```
*Note: Make sure your server exposes the `PORT` (default 8000).*

### Frontend Deployment
1. During the build step, you must inject your backend's live API URL using `NEXT_PUBLIC_API_URL`.
2. If using Vercel, simply add `NEXT_PUBLIC_API_URL` to your project's Environment Variables.
3. The build command is handled automatically by Next.js.
```bash
npm install
npm run build
npm run start
```

## System Features (V1)
- **Authentication:** Register, Login, Update Profile, Change Password.
- **Collections & Products:** Browse beautifully animated categories like Krishna Vastra, Divine Wardrobe, and Jewellery.
- **Cart & Checkout:** Dynamic cart state, secure address management.
- **QR Payment Verification:** Offline QR-based transaction validation.
- **Order Tracking:** Devotees can easily "Track My Seva" through various fulfillment stages.
- **Admin Dashboard:** A robust management interface for Products, Collections, Order fulfillment, and Website Settings.
