import Books from '../Store/Book.js';
import { nanoid } from 'nanoid';
import responses from '../response/index.js';

// create book
export const createBooks = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    // error handle
    if (!name) {
        return responses(
            h,
            'fail',
            'Gagal menambahkan buku. Mohon isi nama buku',
            null,
            400
        );
    }

    const finished = pageCount === readPage;
    const id = nanoid();
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    if (readPage > pageCount)
        return responses(
            h,
            'fail',
            'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
            null,
            400
        );

    try {
        const newBook = {
            id,
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            insertedAt,
            updatedAt,
        };

        Books.push(newBook);

        const isSuccess = Books.filter((book) => book.id === id).length > 0;
        if (isSuccess) {
            return responses(
                h,
                'success',
                'Buku berhasil ditambahkan',
                {
                    bookId: id,
                },
                201
            );
        }
    } catch (error) {
        return responses(h, 'fail', error.message, null, 500);
    }
};

export const getBooks = (request, h) => {
    try {
        const filteredBooks = Books.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        }));
        return responses(
            h,
            'success',
            'success',
            { books: filteredBooks },
            200
        );
    } catch (error) {
        return responses(h, 'fail', error.message, null, 500);
    }
};
export const getBooksById = (request, h) => {
    const bookid = request.params.bookId;
    try {
        const book = Books.find((book) => book.id === bookid);
        if (!book)
            return responses(h, 'fail', 'Buku tidak ditemukan', null, 404);
        return responses(h, 'success', 'success', { book: book }, 200);
    } catch (error) {
        return responses(h, 'fail', error.message, null, 500);
    }
};

export const updateBooks = (request, h) => {
    const bookId = request.params.bookId;
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;
    const updatedAt = new Date().toISOString();

    // Cari indeks buku berdasarkan ID
    const bookIndex = Books.findIndex((book) => book.id === bookId);

    // Cek apakah buku ditemukan
    if (bookIndex === -1) {
        return responses(
            h,
            'fail',
            'Gagal memperbarui buku. Id tidak ditemukan',
            null,
            404
        );
    }

    // Cek apakah nama buku ada
    if (!name) {
        return responses(
            h,
            'fail',
            'Gagal memperbarui buku. Mohon isi nama buku',
            null,
            400
        );
    }

    // Cek apakah readPage tidak lebih besar dari pageCount
    if (readPage > pageCount) {
        return responses(
            h,
            'fail',
            'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            null,
            400
        );
    }

    const finished = pageCount === readPage;

    // Perbarui buku
    try {
        Books[bookIndex] = {
            ...Books[bookIndex],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            finished,
            updatedAt,
        };

        return responses(h, 'success', 'Buku berhasil diperbarui', null, 200);
    } catch (error) {
        return responses(h, 'fail', error.message, null, 500);
    }
};

export const deleteBooks = (request, h) => {
    const bookid = request.params.bookId;
    try {
        const bookIndex = Books.find((book) => book.id === bookid);
        if (!bookIndex)
            return responses(
                h,
                'fail',
                'Buku gagal dihapus. Id tidak ditemukan',
                null,
                404
            );

        if (bookIndex !== -1) {
            Books.splice(bookIndex, 1);
            return responses(h, 'success', 'Buku berhasil dihapus', null, 200);
        }
    } catch (error) {
        return responses(h, 'fail', error.message, null, 500);
    }
};
