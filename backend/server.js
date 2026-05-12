const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Restaurant App Working 🍕");
});

app.listen(5000, () => {
  console.log("Localhost 5000 is running ");
});