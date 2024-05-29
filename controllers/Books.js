import Books from '../models/BooksModel.js';
import { nanoid } from 'nanoid';

// create book
export const createBooks = async (request, h) => {
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
        return h
            .response({
                status: 'fail',
                message: 'Gagal menambahkan buku, mohon isi nama buku',
            })
            .code(400);
    }

    if (
        !year ||
        !author ||
        !summary ||
        !publisher ||
        !pageCount ||
        !readPage ||
        reading === undefined
    ) {
        return h
            .response({
                status: 'fail',
                message: 'Gagal menambahkan buku, mohon isi semua kolom',
            })
            .code(400);
    }

    const finished = pageCount === readPage;
    const id = nanoid();

    if (readPage > pageCount)
        return h
            .response({
                status: 'fail',
                message:
                    'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
            })
            .code(400);

    try {
        await Books.create({
            id,
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            finished,
        });

        return h
            .response({
                status: 'success',
                msg: 'Buku berhasil ditambahkan',
                data: {
                    BookId: id,
                },
            })
            .code(201);
    } catch (error) {
        h.response({ msg: error.message }).code(500);
    }
};

export const getBooks = async (request, h) => {
    const { name } = request.query;
    const condition = name ? { name: { [Op.iLike]: `%${name}%` } } : {};

    try {
        const books = await Books.findAll({
            where: condition,
            attributes: ['id', 'author', 'publisher'],
        });

        return h.response({ status: 'success', data: { books } }).code(200);
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};
export const getBooksById = async (request, h) => {
    const bookid = request.params.bookId;
    try {
        const book = await Books.findOne({
            where: {
                id: bookid,
            },
        });
        if (!book)
            return h
                .response({
                    status: 'fail',
                    message: 'buku tidak ditemukan',
                })
                .code(404);
        return h
            .response({
                status: 'success',
                data: {
                    book,
                },
            })
            .code(200);
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};

export const updateBooks = async (request, h) => {
    const booksId = request.params.bookId;

    const updateBook = await Books.findOne({
        where: {
            id: booksId,
        },
    });
    if (!updateBook)
        return h
            .response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Id tidak ditemukan',
            })
            .code(404);

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

    if (!name) {
        return h
            .response({
                status: 'fail',
                message: 'Gagal memperbarui buku, mohon isi nama buku',
            })
            .code(400);
    }

    if (
        !year ||
        !author ||
        !summary ||
        !publisher ||
        !pageCount ||
        !readPage ||
        reading === undefined
    ) {
        return h
            .response({
                status: 'fail',
                message: 'Gagal memperbarui buku, mohon isi semua kolom',
            })
            .code(400);
    }

    const finished = pageCount === readPage;

    if (readPage > pageCount)
        return h
            .response({
                status: 'fail',
                message:
                    'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
            })
            .code(400);

    try {
        await Books.update(
            {
                name,
                year,
                author,
                summary,
                publisher,
                pageCount,
                readPage,
                reading,
                finished,
            },
            {
                where: {
                    id: booksId,
                },
            }
        );
        return h
            .response({
                status: 'success',
                message: 'Buku berhasil diperbarui',
            })
            .code(200);
    } catch (error) {
        return h.response({ error: error.message }).code(500);
    }
};

export const deleteBooks = async (request, h) => {
    const bookid = request.params.bookId;
    try {
        const product = await Books.findOne({
            where: {
                id: bookid,
            },
        });
        if (!product)
            return h.response({ msg: 'Buku tidak ditemukan' }).code(404);

        await Books.destroy({
            where: {
                id: bookid,
            },
        });

        return h.response({ msg: 'Buku berhasil dihapus' }).code(200);
    } catch (error) {
        return h.response({ msg: error.message }).code(500);
    }
};
