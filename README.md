# 📝 My Blog

A full-stack, feature-rich personal blog application built with the **MERN Stack** (MongoDB, Express.js, React, Node.js).

## ✨ Features

- 🔐 **Secure Admin Dashboard** – Password-protected admin panel for managing posts
- 📝 **Markdown Support** – Write posts in Markdown, rendered as styled HTML
- 🗂️ **Post Categories** – Organize content with categories
- 🔗 **SEO-Friendly URLs** – Clean, readable slugs for every post
- 🖼️ **Image Upload System** – Upload and embed images in blog posts
- 📄 **Pagination** – Smooth browsing experience with paginated posts
- ⚙️ **Full CRUD Operations** – Create, Read, Update, Delete blog posts

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Styling | CSS |
| Content | Markdown |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [npm](https://www.npmjs.com/)

### Installation

1. Repository clone karo:
   ```bash
   git clone https://github.com/ChandraShekharBoke/My-Blog.git
   cd My-Blog
   ```

2. Backend dependencies install karo:
   ```bash
   cd backend
   npm install
   ```

3. Frontend dependencies install karo:
   ```bash
   cd ../frontend
   npm install
   ```

4. Environment variables setup karo — `backend/.env` file banao:
   ```env
   MONGO_URI=your_mongodb_connection_string
   ADMIN_PASSWORD=your_admin_password
   PORT=5000
   ```

5. Backend run karo:
   ```bash
   cd backend
   npm start
   ```

6. Frontend run karo (new terminal):
   ```bash
   cd frontend
   npm run dev
   ```

7. Browser mein open karo:
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
My-Blog/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── server.js
│   └── package.json
└── README.md
```

## 📸 Screenshots

*(Yahan apne blog ke screenshots add karo)*

## 🌐 Deployment

This app is production-ready and can be deployed on:
- **Frontend:** Vercel / Netlify
- **Backend:** Render / Railway
- **Database:** MongoDB Atlas

## 🤝 Contributing

Pull requests welcome hain! Bade changes ke liye pehle issue open karo.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ by [ChandraShekharBoke](https://github.com/ChandraShekharBoke)
