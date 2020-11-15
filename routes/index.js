import { Router } from 'express';
import * as books from './api/books';
const router = Router();

router.get('/books', books.getBooks);
router.get('/books/:id', books.getBookById);
router.post('/books', books.createBook);
router.put('/books/:id', books.updateBookById);
router.delete('/books/:id', books.deleteBookById);
export default router;
