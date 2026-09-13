# Yo-Eats 🍔🍕

Yo-Eats is a modern, full-stack food ordering application built with a robust microservices architecture. It allows users to browse menus, add items to a cart, securely log in, place orders, and track real-time delivery status.

## 🌟 Features
- **Dynamic Menu Catalog**: Food items are fetched dynamically from a dedicated catalog service and seeded automatically via MongoDB.
- **Shopping Cart**: Client-side cart management leveraging `localStorage`.
- **User Authentication**: Secure JWT-based registration and login system.
- **Order Processing**: Generates unique order IDs and manages order state.
- **Live Delivery Tracking**: Simulates real-time delivery tracking (Preparing, Out for Delivery, Delivered) via an independent delivery service.
- **API Gateway**: A single entry point that proxies frontend requests to the appropriate backend microservices.

## 🏗️ Architecture (Microservices)
The backend is completely decoupled into independent Node.js/Express services, orchestrated via Docker Compose:
- `api-gateway` (Port 3000) - Entry point & Proxy
- `catalog-service` (Port 3001) - Manages menu data
- `order-service` (Port 3002) - Manages checkout and order placement
- `auth-service` (Port 3003) - Manages user accounts and JWT Auth
- `delivery-service` (Port 3004) - Manages delivery assignments and tracking
- `mongodb` (Port 27017) - Shared database for persistent storage

## 🚀 How to Run Locally

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed on your machine.

### Startup
1. Clone the repository.
2. Open your terminal in the root directory.
3. Run the following command to build and spin up the entire stack:
   ```bash
   docker-compose up --build
   ```
4. Open your browser and navigate to `http://localhost:8080`.

## 🛠️ Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend Services**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Containerization**: Docker, Docker Compose
- **Proxy/Gateway**: HTTP Proxy Middleware
