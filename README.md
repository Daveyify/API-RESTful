# Product API

A RESTful API for managing products, built with **Node.js**, **Express**, and **MongoDB**.  
It provides full **CRUD operations** (Create, Read, Update, Delete), as well as **pagination and filtering** for retrieving products.

---

## Features

- Create products with either a custom ID or an auto-generated one.
- Retrieve products with filters:
  - Category
  - Availability
  - Price
- Pagination support (`page`, `limit`).
- Update products partially or fully.
- Delete products.
- Interactive API documentation with **Swagger**.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Daveyify/API-RESTful.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the server

   ```bash
   node app.js
   ```
   
---

## Documentation

Once running, the Swagger UI documentation is available at:

```bash
http://localhost:3000/api-docs
```

Here you can see some examples and test the API

---

## Main Endpoints

The main endpoints of this proyect are

- **POST** `/products` → Create a new product  
- **GET** `/products?page=1&limit=10&category=Food&availability=true` → Get all products (with filters & pagination)  
- **GET** `/products/:id` → Get a product by ID  
- **PUT** `/products/:id` → Update a product  
- **DELETE** `/products/:id` → Delete a product  

---

### Developed by: David Suancha


