import { it, expect, beforeEach, describe, vi } from 'vitest';
import request from 'supertest';
import app from '../app.js';

import Book from '../models/books.js';
import UserBook from '../models/userBooks.js';

import { book, userBook } from './mockData.js';

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('POST /books', () => {
  it('should fail when payload is missing required data', async () => {
    const res = await request(app).post('/books').send({});

    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  it('creates new book with isbn and userBook', async () => {
    vi.spyOn(Book, 'findOne').mockResolvedValueOnce(null);

    vi.spyOn(Book, 'create').mockResolvedValueOnce({
      _id: 'book123',
      ...book,
    } as any);

    vi.spyOn(UserBook, 'findOne').mockResolvedValueOnce(null);

    vi.spyOn(UserBook, 'create').mockResolvedValueOnce({
      ...userBook,
      _id: 'userBook123',
    } as any);

    vi.spyOn(UserBook, 'findOne').mockReturnValueOnce({
      populate: vi.fn().mockResolvedValue({
        ...userBook,
        bookId: { _id: 'book123', ...book },
      }),
    } as any);

    const res = await request(app).post('/books').send(book);

    expect(res.status).toBe(201);

    expect(Book.findOne).toHaveBeenCalledWith({ isbn: book.isbn });
    expect(Book.create).toHaveBeenCalled();

    expect(UserBook.create).toHaveBeenCalled();

    expect(res.body.bookId).toBeDefined();
  });

  it('uses existing book when isbn already exists', async () => {
    vi.spyOn(Book, 'findOne').mockResolvedValueOnce({
      _id: 'existingBook',
      ...book,
    } as any);

    vi.spyOn(Book, 'create');

    vi.spyOn(UserBook, 'findOne').mockResolvedValueOnce(null);

    vi.spyOn(UserBook, 'create').mockResolvedValueOnce({
      ...userBook,
      bookId: 'existingBook',
    } as any);

    vi.spyOn(UserBook, 'findOne').mockReturnValueOnce({
      populate: vi.fn().mockResolvedValue({
        ...userBook,
        bookId: { _id: 'existingBook', ...book },
      }),
    } as any);

    const res = await request(app).post('/books').send(book);

    expect(res.status).toBe(201);

    expect(Book.create).not.toHaveBeenCalled();
    expect(Book.findOne).toHaveBeenCalled();

    expect(res.body.bookId._id).toBe('existingBook');
  });

  it('creates book even without isbn', async () => {
    const bookWithoutIsbn = {
      ...book,
      isbn: undefined,
    };

    vi.spyOn(Book, 'create').mockResolvedValueOnce({
      _id: 'noIsbnBook',
      ...bookWithoutIsbn,
    } as any);

    vi.spyOn(UserBook, 'findOne').mockResolvedValueOnce(null);

    vi.spyOn(UserBook, 'create').mockResolvedValueOnce({
      ...userBook,
      bookId: 'noIsbnBook',
    } as any);

    vi.spyOn(UserBook, 'findOne').mockReturnValueOnce({
      populate: vi.fn().mockResolvedValue({
        ...userBook,
        bookId: { _id: 'noIsbnBook', ...bookWithoutIsbn },
      }),
    } as any);

    const res = await request(app).post('/books').send(bookWithoutIsbn);

    expect(res.status).toBe(201);
    expect(Book.create).toHaveBeenCalled();
  });

  it('handles server errors', async () => {
    vi.spyOn(Book, 'findOne').mockRejectedValueOnce(new Error('DB crash'));

    const res = await request(app).post('/books').send(book);

    expect(res.status).toBe(500);
    expect(res.body.message).toBeDefined();
  });
});
