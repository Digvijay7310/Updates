# MERN Blogging Platform

A full-stack blogging platform built with the MERN stack (MongoDB, Express, React, Node.js). Allows users to:

- Create, edit, and delete blog posts  
- Register, create, edit profiles, and log out securely  
- Authenticate using email and password


##  Features

- **User Authentication** – Sign up/login with email/password, with JWT-based session/sessionless auth  
- **Blog Management** – Users can create, edit, and delete their own posts  
- **Profile Management** – Users can view and update their profile  
- **Secure Logout** – End user session securely  
- **Admin can see how many users are there and delete a user using admin panel
- **Admin can see how many blogs are there using admin panel



##  Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| React    | Node.js + Express | MongoDB |

##  Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/Digvijay7310/Updates.git
   cd Updates


2. **Backend setup**
    cd backend 
    npm install

 3. **Frontend setup**
     cd frontend
     npm install

create .env file in backend folder 
PORT=port
MONGODB_URI=mongodb-url
NODE_ENV=production

CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=f43fert4dfge5tte5atwrt3q5tt
ACCESS_TOKEN_EXPIRY=4h

REFRESH_TOKEN_SECRET=rtgeageragreaggarwggeaggaw
REFRESH_TOKEN_EXPIRY=1d

