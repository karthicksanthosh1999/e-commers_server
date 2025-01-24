const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const env = require("dotenv");
env.config();

// Routes
const authRoutes = require("./routes/auth-routes/user.routes");
const adminRoutes = require("./routes/admin-routes/admin.routes");
const errorHandler = require("./middlewares/globelErrorHandler");

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
app.use(cors(options));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin/products", adminRoutes);

const PORT = process.env.PORT;

app.use(errorHandler);
mongoose
  .connect(
    "mongodb+srv://karthicksanthosh1999:MOrvgIBiIb9LvXpL@cluster0.rlvij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    })
  )
  .catch((err) => console.log(err));
