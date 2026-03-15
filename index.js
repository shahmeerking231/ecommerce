const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const cloudinaryConfig = require("./src/services/storage.service");
//Redis Server Start
const {startRedis} = require("./src/services/cache.service");
startRedis();

const staticRoute = require("./src/routes/static.route");
const authRoute = require("./src/routes/auth.route");
const userRoute = require("./src/routes/user.route");
const productRoute = require("./src/routes/product.route");
const orderRoute = require("./src/routes/order.route");
const connectToDb = require("./src/db/database.db");

const app = express();
const PORT = process.env.PORT || 3000;

//database
connectToDb();

//cloudinary
cloudinaryConfig();

//configuration
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));
var dir = path.join(__dirname, 'public');
app.use(express.static(dir));
app.use('/products', express.static(dir));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routes
app.use("/", staticRoute);
app.use("/api/auth", authRoute);
app.use("/user", userRoute);
app.use("/products", productRoute);
app.use("/", orderRoute);

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));