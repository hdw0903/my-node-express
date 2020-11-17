import { Router } from 'express';
import * as books from './api/books';
import * as papago from './api/papago';

const router = Router();

router.get('/books', books.getBooks);
router.get('/books/:id', books.getBookById);
router.post('/books', books.createBook);
router.put('/books/:id', books.updateBookById);
router.delete('/books/:id', books.deleteBookById);
router.post('/papago/detectLangs', papago.detectLangs);
router.post('/papago/n2mt', papago.n2mt);
export default router;
