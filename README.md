# Grocery Booking System

This project consists of a backend service, "grocery-booking-api", built using NestJS framework, and a front end service, "grocery-booking-app", developed with Angular. The backend API provides endpoints for two roles: admin and user. These roles have respective endpoints for managing grocery bookings. Data is handled using PostgreSQL database.

## Backend Service - grocery-booking-api

### Technologies Used
- **NestJS:** A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **TypeORM:** An ORM that can run in NodeJS, the browser, and other JavaScript runtimes. It works with TypeScript and JavaScript.
- **PostgreSQL:** A powerful, open-source relational database system.

### Roles and Endpoints
- Admin:
  - `/admin/addItem`: Add new grocery items to the system.
  - `/admin/getItem`: View existing grocery items.
  - `/admin/deleteItem/:itemName`: Remove grocery items from the system.
  - `/admin/updateItem`: Update details (e.g., name, price) of existing grocery items.
- User:
  - `/user/fetchItems`: View the list of available grocery items.
  - `/user/orderItems`: Ability to book multiple grocery items in a single order.
  - `/user/fetchOrder`: View ordered grocery items.

### Dockerization
The backend service has been dockerized for easy deployment. Dockerfile and docker-compose files are included in the project for containerization.

## Front End Service - grocery-booking-app

### Technologies Used
- **Angular:** A TypeScript-based open-source web application framework led by the Angular Team at Google.

### User Interface
The Angular application consumes the above APIs to provide a user-friendly interface for both admin and user roles. Features include:
- Dashboard for admin to manage bookings.
- User interface for placing orders and viewing bookings.

### Dockerization
The front end application has been dockerized for easy deployment. Dockerfile and docker-compose files are included in the project for containerization.

## Live Deployment
The entire system has been hosted live for easy access. The services are hosted using Render for the backend service and ElephantSQL for the PostgreSQL database.

- **Render:** Render is used to host the backend service, providing a scalable and reliable platform for deploying web applications. The backend service is deployed as a Docker container on Render, ensuring high availability and easy scalability.

- **ElephantSQL:** ElephantSQL is a PostgreSQL database service hosted in the cloud.

The live deployment can be accessed at <br>
- 🌐 [Live Grocery Booking API Service](https://grocery-booking-api.onrender.com/docs)  <br>
- 🌐 [Live Grocery Booking APP Service](https://grocery-booking-app.onrender.com/user)

## Local Setup
To try the project locally, follow these steps:

1. Clone the repository: `git clone git@github.com:Nish-mitha/qp-assessment.git`
2. Navigate to the backend service directory: `cd qp-assessment`
3. Build the application: `docker compose build`
4. Start the application: `docker compose up`

Now, you can access the application from the below  URL's. <br>
- 🌐 [Local Grocery Booking API Service](http://localhost:3000/docs)  <br>
- 🌐 [Local Grocery Booking APP Service](http://172.28.1.1:4200/)


PostgreSQL Database
-------------

-- Database Name: grocery_booking

-- Table: **tbl\_grocery\_items**

```
CREATE TABLE tbl_grocery_items (
  id SERIAL,
  name VARCHAR(255) UNIQUE,
  category VARCHAR(255),
  price REAL
);
```

-- Table: **tbl\_cart**

```
CREATE TABLE tbl_cart (
  id SERIAL,
  user_email VARCHAR(255),
  item_name VARCHAR(255),
  quantity INT
);
```