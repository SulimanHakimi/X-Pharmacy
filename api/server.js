const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./config/passport");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const blogRoutes = require("./routes/blog");
const recommendationRoutes = require("./routes/recommendations");
const prescriptionRoutes = require("./routes/prescription");


const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173","http://localhost:5174","https://hakimi-pharmacy-client.vercel.app"], credentials: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB connection is successful"))
  .catch((err) => {
    console.log(err);
  });
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/prescription", prescriptionRoutes);



app.listen(process.env.PORT, () => console.log("API running on port 5000"));
