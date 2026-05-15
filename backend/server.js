const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth");

app.use("/auth" ,authRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB error:", err));

// 🧪 test route
app.get("/", (req, res) => {
  res.send("API is running 🍕");

});

// 🚀 server başlatma
app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});