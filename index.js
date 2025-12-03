const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const testRoute = require("./routes/test")
const connectToDb = require("./db/db");

const app = express();
const PORT = process.env.PORT || 3000;

//database
connectToDb();

//configuration
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
var dir = path.join(__dirname, 'public/images');
app.use(express.static(dir));
app.use('/products', express.static(dir));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routes
app.use("/", staticRoute);
app.use("/", userRoute);
app.use("/products", productRoute);
app.use("/orders", orderRoute);
app.use("/test", testRoute);

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));