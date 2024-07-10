const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');


// Middleware to parse JSON requests
app.use(express.json());

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST','PATCH'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
};

// Enable CORS with specific options
app.use(cors(corsOptions));

// Middleware for logging paths and methods
app.use((req, res, next) => {
  console.log("path: " + req.path + " method: " + req.method);
  next();
});

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log("DB Connected Successfully. Listening on port " + (process.env.PORT || 4000));
    });
  })
  .catch((error) => console.log('DB connection error:', error));


// declare task name 
const taskRoutes=require('./routes/taskRoute');

const AdministrativeOfficerRoutes=require('./routes/AdministrativeOfficerRoute');
const LocationRoute=require('./routes/LocationRoute');
const weatherHazardRoute=require('./routes/weatherHazardRoute');
const locomotivePilotRoute=require('./routes/locomotivePilotRoute');
const locomotivePilotHazardRoute=require('./routes/locomotivePilotHazardRoute');
const HazardRoute=require('./routes/HazardRoute');
const WeatherRoute=require('./routes/WeatherRoute');



// connect route 
app.use("/api/tasks",taskRoutes);
app.use("/api/AdministrativeOfficer",AdministrativeOfficerRoutes);
app.use("/api/location",LocationRoute);
app.use("/api/weatherHazard",weatherHazardRoute);
app.use("/api/locomotivePilot",locomotivePilotRoute);
app.use("/api/locomotivePilotHazard",locomotivePilotHazardRoute);
app.use("/api/hazard",HazardRoute);
app.use("/api/weather",WeatherRoute);