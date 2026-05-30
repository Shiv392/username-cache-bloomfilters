# Username-cache-bloomfilters 🚀
A scalable username availability checking service inspired by platforms like Instagram, X (Twitter), and GitHub.

The primary goal of this project is to explore how large-scale applications can efficiently validate username availability while reducing unnecessary database queries.

---

## 📖 Overview

When a user signs up, the system needs to determine whether a username is already taken.

A naive approach would query the database for every username check request. While this works at a small scale, it can create significant load on the database as traffic grows.

This project introduces a Bloom Filter layer using Redis to reduce unnecessary database lookups and improve response times.

---

## 🏗️ Architecture

```text
Client
   |
   v
Node.js API
   |
   +----> Redis Bloom Filter
   |
   +----> MySQL
```

### Flow

#### Username Check

1. User enters a username.
2. Bloom Filter is checked.
3. If username is definitely not present:

   * Return Available.
   * No database query is executed.
4. If username may exist:

   * Query MySQL.
   * Return the final result.

#### User Registration

1. Save user in MySQL.
2. Add username to Bloom Filter.
3. Future requests can leverage the Bloom Filter for faster lookups.

---

## ✨ Features

* Username availability checking
* User registration
* Redis Bloom Filter integration
* MySQL persistence
* TypeORM integration
* REST APIs
* Optimized database lookups
* Unique username validation

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* MySQL
* TypeORM

### Caching & Optimization

* Redis
* Redis Bloom Filter

### Development Tools

* Postman
* Docker (optional)
* Git & GitHub

---

## 📂 Project Structure

```text
src/
│
├── controllers/
├── routes/
├── services/
├── entities/
├── repositories/
├── middleware/
├── config/
└── app.ts
```

---

## 🗄️ Database Schema

### Users

| Column     | Type         |
| ---------- | ------------ |
| id         | BIGINT       |
| username   | VARCHAR(100) |
| email      | VARCHAR(255) |
| created_at | TIMESTAMP    |

Constraints:

* UNIQUE(username)

---

## 🔌 API Endpoints

### Check Username

```http
GET /api/usernames/check?username=shiv
```

Response

```json
{
  "username": "shiv",
  "available": true
}
```

---

### Register User

```http
POST /api/users
```

Request

```json
{
  "username": "shiv",
  "email": "shiv@example.com"
}
```

---

## 🎯 Learning Objectives

This project demonstrates:

* Bloom Filter fundamentals
* False Positive handling
* Database indexing concepts
* Redis integration
* API design
* TypeORM usage
* Scalable username lookup strategies
* Backend performance optimization

---

## 🚀 Future Improvements

* Username suggestions
* Redis caching layer
* Read replicas
* Rate limiting
* Metrics and monitoring
* Docker Compose setup
* Load testing
* Distributed architecture

---

## 💡 Why Bloom Filters?

Bloom Filters help answer:

> "Has this username been seen before?"

without hitting the database every time.

Benefits:

* Extremely memory efficient
* Fast lookups
* Reduced database load
* Suitable for large-scale systems

Trade-offs:

* False positives are possible
* False negatives are not possible

Because of false positives, MySQL remains the source of truth.

---

## 📚 Concepts Covered

* Node.js
* TypeScript
* MySQL
* TypeORM
* Redis
* Bloom Filters
* Database Indexing
* Backend System Design
* Performance Optimization

---

## ⭐ Project Goal

Build a production-inspired username availability service while learning practical backend engineering and system design concepts.
