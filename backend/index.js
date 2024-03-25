import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
});

app.post('/books', async(req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return response.status(400).send({
                message: 'Send all required fields',
            });
        };

        const newBook = {

            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        
        const book = await Book.create(newBook);
        return res.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

app.get('/books', async(req, res) => {
    try {
        const books = await Book.find({});
        return res.status(500).json({ 
            count: books.length,
            data: books
         });
    } catch (error) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

app.get('/books/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);

        return res.status(500).json({
            data: book
         });
    } catch (error) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

app.put('/books/:id', async (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return response.status(400).send({
                message: 'Send all required fields',
            });
        };

        const { id } = req.params;
        
        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).send({ message: 'Book updated' });

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
})

app.delete('/books/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        
        if(!result){
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).send({ message: 'Book deleted succesfully' });

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
})

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
