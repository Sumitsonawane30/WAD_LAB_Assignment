const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error in Connecting to MongoDB:', err);
    });

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    publishedYear: Number

});

const Book = mongoose.model('Book', BookSchema);

// Create API - POST

app.post('/add-book', async (req, res) => {
    try {
        const { title, author, publishedYear } = req.body;

        const newBook = new Book({ title, author, publishedYear });
        await newBook.save();

        res.status(200).json({ message: " Book added successfully!" });

    } catch (err) {
        res.status(500).json({ err: " Error adding book..." });
    }
});

// Read API - GET all books

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.send(books);

    } catch (err) {
        res.status(500).json({ err: " Error retrieving book data..." });
    }
});


// Get books by author

app.get('/books/author/:authorName', async (req, res) => {
    try {
        const books = await Book.find({ author: req.params.authorName });

        res.status(200).json(books);

    } catch (err) {
        res.status(500).json({ err: " Error retrieving books by author..." });
    }
});


// Update API - PUT

app.put('/update-book/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const { title, author, publishedYear } = req.body;

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, author, publishedYear },
            { new: true }
        );

        res.status(200).json({ message: " Book updated successfully!", updatedBook });
    } catch (err) {
        res.status(500).json({ err: " Error updating book..." });
    }
});


// Delete API - DELETE by ID

app.delete('/delete-book/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBook = await Book.findByIdAndDelete(id);

        res.status(200).json({ message: "Book deleted successfully!" });

    } catch (err) {
        res.status(500).json({ err: "Error deleting book..." });
    }
});


// Delete books published before a certain year

app.delete('/delete-before-year/:year', async (req, res) => {
    try {

        const year = parseInt(req.params.year);

        const deletedBooks = await Book.deleteMany({ publishedYear: { $lt: year } });

        res.status(200).json({ message: `${deletedBooks.deletedCount} books deleted published before ${year}` });

    } catch (err) {

        res.status(500).json({ err: " Error deleting old books..." });
    }
});
