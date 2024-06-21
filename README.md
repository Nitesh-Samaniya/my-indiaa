# E-commerce Backend API

This project is a backend implementation for an e-commerce platform. It includes role based access for customer, seller and admin, User authentication, product management, a shopping cart system, stripe payment gateway, and order tracking. The backend is built using Node.js, Express, and MongoDB, with API documentation provided via Swagger.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Endpoints](#endpoints)
  - [User Authentication](#user-authentication)
  - [Product Management](#product-management)
  - [Shopping Cart](#shopping-cart)
  - [Order Management](#order-management)
- [Payment Integration](#payment-integration)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Nitesh-Samaniya/my-indiaa.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your environment variables:
    ```plaintext
    PORT=8080
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    REFRESH_SECRET_TOKEN=your_refresh_token
    REFRESH_SECRET_TOKEN=your_refresh_secret
    STRIPE_SECRET_KEY=your_stripe_secret_key
    ```

## Configuration

- **MongoDB**: This project uses MongoDB as the database. Ensure you have a MongoDB instance running and provide the connection string in the `.env` file.
- **JWT**: Used for user authentication. Add your JWT secret in the `.env` file.
- **Stripe**: Used for payment processing. Add your Stripe secret key in the `.env` file.

## Usage

## API Documentation

Swagger is used to document the API, uncomment the code in swagger.js and comment the deploy url and https.

1. To autogenerate swagger doc
    ```bash
    node swagger.js
    ```

2. Start the server:
    ```bash
    npm run dev
    ```

3. The server will be running at `http://localhost:8080`.

## API Documentation

For swagger docs, visit `http://localhost:8080/doc` to view the API documentation.


## Endpoints

### User Authentication

- **POST /auth/user/register**
  - Registers a new user.

- **POST /auth/user/login**
  - Logs in a user and returns an access token.

- **POST /auth/user/refresh-token**
  - Refreshes the access token using a refresh token.

### Product Management

- **POST /api/products**
  - Adds a new product. (Seller only)

- **GET /api/products**
  - Retrieves a list of products with pagination.

- **GET /api/products/{productId}**
  - Retrieves details of a specific product.

- **GET /api/products/search**
  - Searches products based on query parameters (e.g., name, category).

- **DELETE /api/products/{productId}**
  - Deletes a product. (Seller only)

### Shopping Cart

- **POST /api/cart/add/{productId}**
  - Adds a product to the user's shopping cart.

- **POST /api/cart/remove/{productId}**
  - Removes a product from the user's shopping cart.

- **PATCH /api/cart/increment/{productId}**
  - Increments the quantity of a product in the cart.

- **PATCH /api/cart/decrement/{productId}**
  - Decrements the quantity of a product in the cart.

- **GET /api/cart**
  - Retrieves the user's current shopping cart contents.

- **POST /api/cart/checkout**
  - Processes the checkout of the user's shopping cart, creates an order.

### Order Management

- **GET /api/orders**
  - Retrieves a list of orders placed by the user.

- **GET /api/orders/{orderId}**
  - Retrieves details of a specific order.

## Payment Integration

This project uses Stripe for payment processing. During the checkout process, the user can provide a payment method, and the Stripe API is used to handle the payment.


## Author
- [@Nitesh-Samaniya](https://github.com/Nitesh-Samaniya)
