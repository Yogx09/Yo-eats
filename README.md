<div align="center">
  <img src="yo.png" alt="Yo-Eats Logo" width="200"/>
  <h1>🍔 Yo-Eats Food Delivery Platform</h1>
  <p><strong>A modern, highly scalable food ordering platform powered by a robust Microservices Architecture.</strong></p>

  [![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg?style=for-the-badge&logo=node.js)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-4.x-black.svg?style=for-the-badge&logo=express)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-success.svg?style=for-the-badge&logo=mongodb)](https://mongodb.com)
  [![Docker](https://img.shields.io/badge/Docker-Compose-blue.svg?style=for-the-badge&logo=docker)](https://docker.com)
</div>

---

## 🌟 Features Overview
- **Dynamic Menu Catalog**: Food items are fetched dynamically from a dedicated catalog service and seeded automatically.
- **Secure Authentication**: JWT-based registration and login system with encrypted sessions.
- **Real-time Order Processing**: Generates unique order IDs and manages cart checkout.
- **Live Delivery Tracking**: Autonomous delivery service that tracks driver assignment and ETA.
- **API Gateway**: A single entry point that seamlessly proxies frontend traffic to backend services.
- **Containerized**: 100% Dockerized for easy deployment and scalability.

---

## 🏗️ Microservices Architecture

Yo-Eats is entirely decoupled. It separates concerns into individual, highly cohesive microservices that communicate over a private network. 

```mermaid
graph TD;
    Client([💻 Frontend / User Browser]) -->|HTTP Requests| Gateway(🚪 API Gateway :3000)
    
    Gateway -->|/api/auth| Auth(🔐 Auth Service :3003)
    Gateway -->|/api/menu| Catalog(📋 Catalog Service :3001)
    Gateway -->|/api/orders| Order(🛒 Order Service :3002)
    Gateway -->|/api/delivery| Delivery(🚚 Delivery Service :3004)
    
    Order -.->|Internal Post: /api/delivery/assign| Delivery
    
    Auth --> DB[(🗄️ MongoDB Atlas)]
    Catalog --> DB
    Order --> DB
    Delivery --> DB

    classDef frontend fill:#ffb3ba,stroke:#333,stroke-width:2px;
    classDef gateway fill:#ffdfba,stroke:#333,stroke-width:2px;
    classDef service fill:#baffc9,stroke:#333,stroke-width:2px;
    classDef db fill:#bae1ff,stroke:#333,stroke-width:2px;

    class Client frontend;
    class Gateway gateway;
    class Auth,Catalog,Order,Delivery service;
    class DB db;
```

### 🧩 The Services
| Service | Port | Description | Tech Stack |
|---------|------|-------------|------------|
| **API Gateway** | `3000` | Routes traffic to the correct microservice. | Node, HTTP-Proxy |
| **Catalog** | `3001` | Handles fetching and seeding the food menu. | Express, Mongoose |
| **Order** | `3002` | Processes shopping carts and initiates delivery. | Express, Mongoose |
| **Auth** | `3003` | Validates users and issues JSON Web Tokens. | Express, JWT |
| **Delivery** | `3004` | Tracks live delivery statuses and driver ETAs. | Express, Mongoose |
| **Frontend** | `8080` | Client-facing UI served via NGINX. | HTML, CSS, JS |

---

## 🚀 How to Run Locally

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed on your machine.
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) cluster.

### Startup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Yo-Eats.git
   cd Yo-Eats
   ```

2. **Set your Database:**
   Update the `MONGO_URI` environment variable in the `docker-compose.yml` file to your personal MongoDB Atlas connection string.

3. **Spin up the Architecture:**
   ```bash
   docker-compose up --build
   ```

4. **Enjoy!**
   Open your browser and navigate to `http://localhost:8080`.

---
<div align="center">
  <i>Built with ❤️ for a seamless food delivery experience.</i>
</div>
