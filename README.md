# Node.js Microservices Architecture

A simple microservices-based application built with Node.js and Express, demonstrating API Gateway pattern and containerization with Docker.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Services](#services)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Docker Setup](#docker-setup)
- [Development](#development)

## 🎯 Overview

This project demonstrates a basic microservices architecture with three main components:

- **API Gateway**: Routes requests to appropriate microservices
- **User Service**: Manages user data
- **Product Service**: Manages product data

Each service is independently deployable and containerized using Docker.

## 🏗️ Architecture

```
Client
  ↓
API Gateway (Port 4000)
  ├─→ User Service (Port 4001)
  └─→ Product Service (Port 4002)
```

The API Gateway acts as a single entry point for clients, forwarding requests to the appropriate microservice based on the endpoint.

## 🔧 Services

### 1. Gateway Service

- **Port**: 4000
- **Purpose**: API Gateway that routes requests to microservices
- **Endpoints**:
  - `/users` - Proxies to User Service
  - `/products` - Proxies to Product Service

### 2. User Service

- **Port**: 4001
- **Purpose**: Handles user-related operations
- **Endpoints**:
  - `GET /users` - Returns list of users

### 3. Product Service

- **Port**: 4002
- **Purpose**: Handles product-related operations
- **Endpoints**:
  - `GET /products` - Returns list of products

## 💻 Tech Stack

- **Runtime**: Node.js 22
- **Framework**: Express.js v5.2.1
- **HTTP Client**: Axios v1.13.2
- **Containerization**: Docker
- **Development**: ES6 Modules

## 📁 Project Structure

```
nodejs-microservices/
├── gateway/
│   ├── index.js          # Gateway service implementation
│   └── package.json      # Gateway dependencies
├── product-service/
│   ├── index.js          # Product service implementation
│   ├── package.json      # Product service dependencies
│   └── Dockerfile        # Product service container config
├── user-service/
│   ├── index.js          # User service implementation
│   ├── package.json      # User service dependencies
│   └── Dockerfile        # User service container config
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 22 or higher
- npm or yarn
- Docker (for containerized deployment)

### Installation & Running Locally

1. **Clone the repository**

```bash
git clone <repository-url>
cd nodejs-microservices
```

2. **Install dependencies and start each service**

**Terminal 1 - User Service:**

```bash
cd user-service
npm install
npm start
```

**Terminal 2 - Product Service:**

```bash
cd product-service
npm install
npm start
```

**Terminal 3 - Gateway:**

```bash
cd gateway
npm install
npm start
```

The services will be available at:

- Gateway: http://localhost:4000
- User Service: http://localhost:4001
- Product Service: http://localhost:4002

## 📡 API Endpoints

### Via Gateway (Port 4000)

#### Get All Users

```bash
GET http://localhost:4000/users
```

**Response:**

```json
[
  { "id": 1, "name": "John Doe" },
  { "id": 2, "name": "Jane Smith" }
]
```

#### Get All Products

```bash
GET http://localhost:4000/products
```

**Response:**

```json
[
  { "id": 1, "name": "Product A" },
  { "id": 2, "name": "Product B" }
]
```

### Direct Service Access

You can also access services directly (not recommended for production):

- **User Service**: `http://localhost:4001/users`
- **Product Service**: `http://localhost:4002/products`

## 🐳 Docker Setup

### Building Docker Images

Build individual service images:

```bash
# User Service
cd user-service
docker build -t user-service .

# Product Service
cd product-service
docker build -t product-service .
```

### Running with Docker

```bash
# Run User Service
docker run -d -p 4001:4001 --name user-service user-service

# Run Product Service
docker run -d -p 4002:4002 --name product-service product-service

# Run Gateway (locally, as it needs to connect to other services)
cd gateway
npm start
```

### Docker Network Setup (Recommended)

For services to communicate within Docker:

```bash
# Create a network
docker network create microservices-network

# Run services on the network
docker run -d --network microservices-network --name user-service -p 4001:4001 user-service
docker run -d --network microservices-network --name product-service -p 4002:4002 product-service

# Update gateway URLs to use container names instead of localhost
# Then run gateway
```

### Docker Compose (Future Enhancement)

Create a `docker-compose.yml` file to orchestrate all services:

```yaml
version: "3.8"
services:
  user-service:
    build: ./user-service
    ports:
      - "4001:4001"
    networks:
      - microservices

  product-service:
    build: ./product-service
    ports:
      - "4002:4002"
    networks:
      - microservices

  gateway:
    build: ./gateway
    ports:
      - "4000:4000"
    depends_on:
      - user-service
      - product-service
    networks:
      - microservices
    environment:
      - USER_SERVICE_URL=http://user-service:4001
      - PRODUCT_SERVICE_URL=http://product-service:4002

networks:
  microservices:
    driver: bridge
```

Then run: `docker-compose up`

## 🛠️ Development

### Development Mode

All services use `nodemon` for hot-reloading during development:

```bash
npm start
```

### Adding New Services

1. Create a new service directory
2. Add `package.json` with Express dependencies
3. Create `index.js` with service logic
4. Create `Dockerfile` for containerization
5. Update gateway to route to the new service

## 📝 Future Enhancements

- [ ] Add Docker Compose configuration
- [ ] Implement service discovery (e.g., Consul, Eureka)
- [ ] Add database integration (MongoDB/PostgreSQL)
- [ ] Implement authentication & authorization
- [ ] Add logging and monitoring (Winston, Prometheus)
- [ ] Implement health check endpoints
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Implement rate limiting
- [ ] Add unit and integration tests
- [ ] Set up CI/CD pipeline
- [ ] Implement message queue (RabbitMQ/Kafka) for async communication
- [ ] Add environment-based configuration

## 📄 License

ISC

---

**Note**: This is a learning project demonstrating basic microservices architecture. For production use, additional features like authentication, error handling, logging, and monitoring should be implemented.
