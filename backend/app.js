const express = require("express");
const todoRouter = require("./routes/todoRoutes");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

const app = express();

// Enable CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
    methods: ["GET", "POST", "PATCH", "DELETE"], // Specify allowed methods
    credentials: true, // Include credentials if needed (e.g., cookies)
  })
);

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "..", "views"));

// app.use(express.static(path.join(__dirname, "..", "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/todo", todoRouter);

module.exports = app;
