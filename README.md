<div align="center">

# 🛍️ E-Commerce Web Application

### A Modern Full-Stack Shopping Platform

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Contributing](#-contributing) • [License](#-license)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 About

A feature-rich e-commerce web application built with Node.js and Express.js.  This platform provides a seamless shopping experience for users and powerful management tools for administrators.  The application features a modern UI built with Tailwind CSS and DaisyUI components, ensuring a responsive and visually appealing interface.

---

## ✨ Features

### 👥 User Features

- 🔐 **User Authentication** - Secure login and signup system
- 🛒 **Shopping Cart** - Add products to cart with quantity management
- 📦 **Product Browsing** - View all available products with detailed information
- 🧾 **Order Management** - Place orders and track order history
- 📊 **Order Status** - Real-time order status tracking (Pending/Delivered)
- 💳 **Order Summary** - Detailed breakdown of cart items and total price
- 👤 **User Profile** - Manage personal information

### 🔧 Admin Features

- ➕ **Add Products** - Create new product listings
- ✏️ **Edit Products** - Update existing product information
- 🗑️ **Delete Products** - Remove products from inventory
- 📈 **Product Management** - Full CRUD operations for inventory

### 🎨 Design Features

- 📱 **Fully Responsive** - Works seamlessly on all devices
- 🌓 **Modern UI/UX** - Clean and intuitive interface
- 🎨 **DaisyUI Components** - Beautiful pre-styled components
- ⚡ **Fast & Lightweight** - Optimized performance

---

## 🖼️ Demo

<div align="center">

### 🔐 User Authentication
![Login Page](![image2](image2))

### 🏠 Products Page
![Products Page](![image3](image3))

### 🛒 Shopping Cart
![Shopping Cart](![image1](image1))

### 📦 Orders History
![Orders Page](![image4](image4))

</div>

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Server-side JavaScript runtime |
| **Express. js** | Web application framework |
| **EJS** | Templating engine for dynamic HTML |
| **Tailwind CSS** | Utility-first CSS framework |
| **DaisyUI** | Tailwind CSS component library |
| **MongoDB** | Database for storing user, product, and order data |
| **Session Management** | User authentication & authorization |

---

## 🚀 Installation

Follow these steps to set up the project locally:

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### Step 1: Clone the Repository

```bash
git clone https://github.com/shahmeerking231/ecommerce.git
cd ecommerce
```

### Step 2: Install Dependencies

```bash
npm install
```

or if you're using yarn:

```bash
yarn install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory and add your environment variables:

```env
PORT=3000
DATABASE_URL=your_mongodb_connection_string
SECRET_KEY=your_secret_key
# Add other environment variables as needed
```

### Step 4: Start the Development Server

```bash
npm start
```

or for development with auto-reload:

```bash
npm run dev
```

### Step 5: Open Your Browser

Navigate to `http://localhost:3000` to view the application.

---

## 💻 Usage

### For Users

1. **Sign Up/Login** - Create an account or login with existing credentials
2. **Browse Products** - Explore the product catalog on the home page
3. **Add to Cart** - Select products and add them to your cart with desired quantity
4. **Manage Cart** - Update quantities or remove items from your cart
5. **Place Order** - Review your cart summary and place your order
6. **Track Orders** - View your order history with delivery status

### For Admins

1. **Login as Admin** - Use admin credentials to access admin features
2. **Manage Products** - Add, edit, or delete products from the inventory
3. **View Orders** - Monitor all orders placed by users
4. **Update Product Details** - Modify prices, descriptions, and images

---

## 📁 Project Structure

```
├── src/
│   ├── views/                    # EJS templates
│   │   ├── partials/             # Reusable components (header, footer)
│   │   ├── user/                 # User-related views
│   │   ├── admin/                # Admin-related views
│   │   └── auth/                 # Authentication views
│   ├── routes/                   # Express routes
│   │   ├── user.route.js
│   │   ├── admin.route.js
│   │   ├── auth.route.js
│   │   ├── product.route.js
│   │   └── order.route.js
│   ├── controllers/              # Route controllers
│   │   ├── user.controller.js
│   │   ├── admin.controller. js
│   │   ├── auth.controller.js
│   │   ├── product.controller.js
│   │   └── order. controller.js
│   ├── models/                   # Database models
│   │   ├── user.model.js
│   │   ├── product.model.js
│   │   └── order.model.js
│   ├── middleware/               # Custom middleware
│   │   └── auth.middleware.js
│   ├── services/                 # Business logic services
│   │   └── storage.service.js
│   └── db/                       # DB Configuration files
│       └── database.js
├── . env                          # Environment variables
├── index.js                        # Main application file
├── package.json                  # Project dependencies
└── README.md                     # Project documentation
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork the Repository**

   Click the "Fork" button at the top right of this page.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/your-username/ecommerce.git
   cd ecommerce
   ```

3. **Create a New Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

   Use a descriptive branch name:
   - `feature/add-payment-gateway`
   - `bugfix/fix-cart-calculation`
   - `docs/update-readme`

4. **Make Your Changes**

   - Write clean, readable code
   - Follow the existing code style
   - Add comments where necessary
   - Test your changes thoroughly

5. **Commit Your Changes**

   ```bash
   git add .
   git commit -m "Add:  descriptive commit message"
   ```

   Commit message prefixes:
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for updates to existing features
   - `Docs:` for documentation changes

6. **Push to Your Fork**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**

   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Provide a clear description of your changes
   - Link any related issues

### Contribution Guidelines

- ✅ Write clear, descriptive commit messages
- ✅ Test your code before submitting
- ✅ Update documentation if needed
- ✅ Follow the existing code style
- ✅ Be respectful and constructive in discussions
- ❌ Don't submit large PRs without discussing first
- ❌ Don't include unnecessary files or dependencies

### Reporting Issues

Found a bug?  Have a feature request? Please [open an issue](https://github.com/shahmeerking231/ecommerce/issues) with:

- A clear title and description
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots if applicable

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

<div align="center">

**Shahmeer**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/shahmeerking231)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your-email@example.com)

---

### ⭐ If you found this project helpful, please give it a star

Made with ❤️ by [Shahmeer](https://github.com/shahmeerking231)

</div>
