const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const env = require("dotenv");
env.config();

const app = express();

const options = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cache-Control",
    "Expires",
    "Pragma",
  ],
  credentials: true,
};
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT;
mongoose
  .connect(
    "mongodb+srv://karthicksanthosh1999:MOrvgIBiIb9LvXpL@cluster0.rlvij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((res) =>
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    })
  )``.catch((err) => console.log(err));
