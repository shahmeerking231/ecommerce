# ANSWERS.md

## 1. How to run
To run this project on a fresh machine, follow these steps:

1. **Prerequisites**
   Ensure you have the following installed on your machine:
   - [Node.js](https://nodejs.org/) (v14 or higher)
   - [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
   - [MongoDB](https://www.mongodb.com/) (Local community server running or a MongoDB Atlas connection string)

2. **Clone the Repository**
   ```bash
   git clone [https://github.com/shahmeerking231/ecommerce.git](https://github.com/shahmeerking231/ecommerce.git)
   cd ecommerce
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```
   
4. **Set environmental variables**
   ```bash
   PORT=3000
   DATABASE_URL=your_mongodb_connection_string
   SECRET_KEY=your_secret_key

   //cloudinary for images
   CLOUDINARY_CLOUD_NAME =
   CLOUDINARY_API_KEY = 
   CLOUDINARY_API_SECRET =

   //stripe for payments
   STRIPE_SECRET_KEY =

   //redis for cache
   REDIS_URI =

   //for production setup
   SITE_URL =
   ```

5. **Start the server**
   ```bash
   npm run dev
   ```

6. **Access the Application**
Open your browser and navigate to http://localhost:3000.

## 2. Stack choice
Why this stack? I chose Node.js, Express, and MongoDB (coupled with EJS for templating) because it provides a highly efficient, single-language (JavaScript) ecosystem optimized for asynchronous, non-blocking I/O operations. Using EJS for Server Side Rendering for speed.

What would have been a worse choice and why? A worse choice would have been using a Java Spring Boot for this simple application, the reason not to chose Spring Boot is complexitiy for small applications, else it is good to choose due to its secure environment. And for frontend i use EJS instead of react/vue or other framework to minimize the logic and easy for me to create while learning.

## 3. One real edge case
I think it is the login/signup validation **src/controllers/auth.controller.js** like i handle it correctly for signup first checking the required fields then checking the database for already existed accounts associated with email, then hashed the password and store it in database.

## 4. AI usage
I use AI in it, gemini while i am doing a research about the structure and implementation of an ecommerce site, then use github copilot for small bug fixes and some features implmentation. First Checking the logic then get help from AI.

## 5. Honest gap
Like in my project, it's my old project and have a some issues, i wanted to submit my other projects but they are not well documented yet so i choose this. The project is at very basic level for my skill set.
