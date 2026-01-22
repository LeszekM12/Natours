<p align="center">
<img width="197" height="197" alt="logo-green-round" src="https://github.com/user-attachments/assets/eba217e4-ca1f-4e42-b125-6aa7ed736179" />
</p>

# Natours | Leszek Mikrut  - Full‑Stack Tour Booking Application

Natours is a full‑stack web application for browsing, booking and reviewing adventure tours.  
The project includes a complete user system, secure authentication, payments, image uploads, and a polished user dashboard.

---

## 🚀 Tech Stack

### **Backend**
- **Node.js** - runtime environment
- **Express.js** - backend framework
- **MongoDB + Mongoose** - database & ODM
- **JWT Authentication** - secure login, signup, password reset
- **Stripe** - payment processing (Checkout Sessions)
- **Cloudinary** - image hosting for users and tours
- **Multer + Sharp** - image upload & optimization
- **SendGrid** - transactional emails (welcome, password reset)
- **Rate limiting, sanitization, CSP** - production‑grade security

### **Frontend**
- **Pug Templates** - server‑side rendering
- **Vanilla JS** - dynamic UI (reviews, billing, modals)
- **SCSS/CSS** - responsive, modern UI
- **Parcel / Bundling** (opcjonalnie, jeśli używasz)

---

## 🌐 Features

### **User Features**
- Create account, login, logout
- Update profile, password, avatar
- View booked tours
- Write, edit and delete reviews
- Billing page with secure card preview toggle
- Beautiful empty states for bookings & reviews

### **Tour Features**
- Browse all tours
- View detailed tour pages
- See locations, guides, reviews, images
- Book tours using Stripe Checkout

### **Admin Features**
- Manage tours, users, reviews, bookings (API)
- Upload and process images
- Secure role‑based access

---

## 💳 Payments (Stripe)
Natours uses **Stripe Checkout** for secure payments.  
Each booking creates a Stripe session and stores the booking in MongoDB after successful payment.

---

## 🖼 Image Hosting (Cloudinary)
All user avatars and tour images are uploaded to **Cloudinary**, ensuring:
- fast delivery (CDN)
- automatic optimization
- HTTPS URLs compatible with Stripe

---

## 🔐 Security
The app includes:
- JWT authentication with refresh logic
- Password hashing (bcrypt)
- Rate limiting
- NoSQL injection protection
- XSS protection
- Strict Content Security Policy (CSP)
- Sanitized image uploads

---

## 📦 Installation

```bash
git clone https://github.com/LeszekM12/Natours
cd Natours
npm install
```
---

## 📘 API Documentation

You can import the full Postman collection:

**Public Postman Collection:**
https://leszekm12-1301293.postman.co/workspace/Leszek-Mikrut-Industries's-Work~bb700825-1a43-44b6-81a7-8e62ee7f87f3/collection/49860722-1ecc0750-09b2-4866-b1ce-270533fb286b?action=share&source=copy-link&creator=49860722

**`postman/Natours.postman_collection.json`**

This collection includes:
- all API endpoints
- authentication flow
- booking flow (Stripe)
- reviews
- users
- tours

---

## 🙌 Credits

This project is based on the Natours application from Jonas Schmedtmann’s  
**“Node.js, Express, MongoDB & More: The Complete Bootcamp”** course.

The original project structure, core concepts, and initial architecture were inspired by his work.  
All additional features, UI improvements, integrations (Stripe, Cloudinary), security upgrades,  
and dashboard enhancements were designed and implemented by **Leszek**.

Special thanks to Jonas for creating one of the best Node.js learning resources available.

