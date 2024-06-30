# Electronic E-commerce Web App

This is a full-stack e-commerce web application built using Node.js, React.js, Tailwind CSS, Redis, and MongoDB. Users can sign up using email or Google, verify their email, view products, add products to their cart, and make purchases. Upon making a purchase, an order confirmation email is sent to the user.

## Features

- **User Authentication**: Sign up using email or Google.
- **Email Verification**: Receive an email to verify your account.
- **Product Browsing**: View available electronic products.
- **Shopping Cart**: Add products to your cart.
- **Purchases**: Buy products directly from the app.
- **Order Confirmation**: Receive an order confirmation email after making a purchase.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React.js
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Caching**: Redis
- **Authentication**: OAuth2 for Google login, JSON Web Tokens (JWT)
- **Email Service**: Nodemailer with OAuth2

## Screenshots

### Signin Page
![signin Page](/public/screenshots/s2.png)

### Home Page
![home page](/public/screenshots/s3.png)

### Product Details
![product Details](/public/screenshots/s5.png)

### Shopping Cart
![shopping Cart](/public/screenshots/s4.png)

### Signup Page
![signup page](/public/screenshots/s1.png)

### Order Confirmation
![order Confirmation](/public/screenshots/s6.png)

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/narenMagarZ/electronic-ecommerce.git
    cd electronic-ecommerce
    ```

2. **Install dependencies**:
    ```sh
    cd backend && npm install
    cd frontend && npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following variables:
    ```env
    OAUTH_RIDIRECT_URI
    OAUTH_CLIENT_SECRET
    OAUTH_CLIENT_ID
    OAUTH_REFRESH_TOKEN
    JWT_SECRET_KEY
    ```


