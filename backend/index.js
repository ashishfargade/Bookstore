import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors;'

const app = express();

app.use(express.json());
app.use(cors());

// app.use(cors({
//     origin: `http://localhost:${PORT}`,
//     methods: ['GET', 'PORT', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }));

app.get("/", (req, res) => {
  console.log(req);
});

app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
