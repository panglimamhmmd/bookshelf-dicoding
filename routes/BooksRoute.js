import {
    createBooks,
    getBooks,
    getBooksById,
    updateBooks,
    deleteBooks,
} from '../controllers/Books.js';

const router = [
    {
        method: 'GET',
        path: '/books',
        handler: getBooks,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBooksById,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBooks,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBooks,
    },
    {
        method: 'POST',
        path: '/books',
        handler: createBooks,
    },
];

export default router;
// const router = express.Router();

// router.get('/books', getBooks);
// router.get('/books/:bookId', getBooksById);
// router.post('/books', createBooks);
// router.put('/books/:bookId', updateBooks);
// router.delete('/books/:id', deleteBooks);

// export default router;
