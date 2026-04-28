import { it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { book } from './mockData.js';
import Book from './../models/books.js';
import UserBook from './../models/userBooks.js';
import { describe } from 'node:test';

const DEFAULT_USER_ID = '64a0c0b0c3f8fa2d1e4b0001';

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('POST /', () => {
  it('post failed', async () => {
    vi.spyOn(Book, 'findOne').mockRejectedValueOnce(new Error('error'));

    const res = await request(app).post('/books').send(book);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      message: 'Something went wrong when adding to the database - postBook',
    });
  });
});
