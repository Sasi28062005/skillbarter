const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// ✅ Middleware to parse JSON
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // Optional, for parsing form data

// ✅ User Routes
app.use("/api", require("./routes/userRoutes"));


const PORT = process.env.PORT || 5002;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
