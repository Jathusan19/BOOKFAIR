# Colombo International Bookfair Stall Reservation System

## Overview
This is a MERN stack application for managing stall reservations at the Colombo International Bookfair. It consists of a backend API and two frontend applications (Vendor Portal and Employee Portal).

## Structure
- `/backend`: Node.js + Express + MongoDB API
- `/frontend-vendor`: React + TypeScript (Vite) for Vendors
- `/frontend-employee`: React + TypeScript (Vite) for Employees/Admins

## Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas)

## Setup & Running

### Backend
1. Navigate to `/backend`
2. Install dependencies: `npm install`
3. Create a `.env` file (see `.env.example` or implementation details)
4. Run dev server: `npm run dev`

### Vendor Portal
1. Navigate to `/frontend-vendor`
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`

### Employee Portal
1. Navigate to `/frontend-employee`
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`

## Environment Variables
Create a `.env` file in `/backend` with:
```
MONGO_URI=mongodb://localhost:27017/bookfair
JWT_ACCESS_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=user@example.com
EMAIL_PASS=password
CLIENT_VENDOR_URL=http://localhost:5173
CLIENT_EMPLOYEE_URL=http://localhost:5174
```
