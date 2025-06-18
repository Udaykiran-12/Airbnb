
# 🏡 Airbnb Clone – Full-Stack SSR Web App

A full-stack, server-side rendered web application inspired by Airbnb, built using **Node.js**, **Express**, **MongoDB**, and **EJS**. Users can register, create, update, and delete property listings with image uploads, geolocation maps, and secure authentication.

🚀 **Live Demo**: [https://airbnb-2-jgpc.onrender.com/listings](https://airbnb-2-jgpc.onrender.com/listings)

## 🔧 Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** EJS (Embedded JavaScript Templates), Custom CSS
- **Authentication:** Passport.js, Express Sessions
- **Image Uploads:** Cloudinary + Multer
- **Maps & Geocoding:** Mapbox API
- **Deployment:** Render

## ✨ Features

- ✅ User registration & login with hashed passwords (Passport.js)
- 🏠 Add/Edit/Delete property listings
- 📸 Upload multiple images using Cloudinary
- 🌍 View listing locations on a Mapbox-powered map
- 🛡️ Authentication-based access control (CRUD restricted to owners)
- 💬 Flash messages for user feedback
- ❌ 404 and custom error handling
- 🌐 Responsive UI with clean templating via EJS

## 📸 Screenshots

| Listings Page | Create Listing | Map View |
|---------------|----------------|----------|
| ![listings](https://user-images.githubusercontent.com/1234567890/listings.png) | ![create](https://user-images.githubusercontent.com/1234567890/create.png) | ![map](https://user-images.githubusercontent.com/1234567890/map.png) |

## 🧩 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Udaykiran-12/Airbnb.git
cd Airbnb
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MAPBOX_TOKEN=your_mapbox_token
DB_URL=your_mongodb_url
SECRET=your_session_secret
```

### 4. Start the server
```bash
node app.js
```

Visit `http://localhost:3000/listings` to view the site locally.

## 📂 Folder Structure

```
Airbnb/
│
├── models/         # Mongoose models for User & Listing
├── public/         # Static assets (CSS, JS, images)
├── routes/         # Express route handlers
├── utils/          # Cloudinary, geocoding helpers
├── views/          # EJS templates
│   ├── listings/   # Listing pages
│   └── users/      # Auth pages
├── middleware/     # Auth & error middleware
├── app.js          # Entry point
└── .env.example    # Environment config example
```

## ✍️ Author

**Pedduri Udaykiran**  
- [GitHub](https://github.com/Udaykiran-12)  
- [LinkedIn](https://www.linkedin.com/in/pedduri-udaykiran)



## 🙌 Acknowledgements

- [Colt Steele’s YelpCamp course](https://www.udemy.com/course/the-web-developer-bootcamp/)
- [Cloudinary](https://cloudinary.com/)
- [Mapbox](https://www.mapbox.com/)


