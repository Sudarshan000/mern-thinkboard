import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


import noteRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors(
  {
    origin: "http://localhost:5173",
  }
));

app.use(express.json()); // Middleware to parse JSON bodies

app.use(rateLimiter); // Apply rate limiting middleware

app.use("/api/notes", noteRoutes);

connectDB().then(() => {
  app.listen(5000, () => {
    console.log('Server is running on port ' + PORT);
  });
})
 


