import express from 'express';
import cors from 'cors';
import { generateBooks } from './utils/bookGenerator.js';

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/books', (req, res) => {
    const lang = req.query.lang || 'en';
    const seed = parseInt(req.query.seed) || 0;
    const page = parseInt(req.query.page) || 1;
    const likes = parseFloat(req.query.likes) || 0;
    const reviews = parseFloat(req.query.reviews) || 0;

    const books = generateBooks({ lang, seed, page, likes, reviews });
    res.json(books);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
