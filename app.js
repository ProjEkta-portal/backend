require("dotenv").config();

const express = require("express");
const http = require("http")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors");

const collegeRoutes = require("./routes/college.route");

const app = express();
app.use(cors())
const server = http.createServer(app);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
})

app.use('/api/colleges', collegeRoutes);

app.use((req, res, next) => {
  const err = new Error("Could not find this route");
  res.status(404);
  next(err);
});

app.use((error, req, res, next) => {
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to mongoDB atlas database");
    server.listen(process.env.PORT, '0.0.0.0');
  })
  .catch((err) => {
    console.log(err);
  });