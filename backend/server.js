const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const restaurantsRoutes = require("./routes/restaurant")

app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantsRoutes)


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB error:", err));

// test route
app.get("/", (req, res) => {
  res.send("API is running 🍕");

});

// server start
app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});