import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app.js';

import UserBook from '../models/userBooks.js';
import { userBook } from './mockData.js';

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('GET /user-books', () => {
  it('returns user books', async () => {
    vi.spyOn(UserBook, 'find').mockReturnValue({
      sort: vi.fn().mockReturnValue({
        populate: vi.fn().mockResolvedValue([userBook]),
      }),
    } as any);

    const res = await request(app).get('/books');

    expect(res.status).toBe(201);
    expect(res.body).toEqual([userBook]);
  });

  it('handles errors', async () => {
    vi.spyOn(UserBook, 'find').mockImplementation(() => {
      throw new Error('DB error');
    });

    const res = await request(app).get('/books');

    expect(res.status).toBe(500);
  });
});

const mockUpdate = (returnValue: any, reject = false) => {
  if (reject) {
    return vi
      .spyOn(UserBook, 'findByIdAndUpdate')
      .mockRejectedValueOnce(new Error('fail'));
  }

  return vi
    .spyOn(UserBook, 'findByIdAndUpdate')
    .mockResolvedValueOnce(returnValue);
};

describe('PUT /userbooks/:id/status', () => {
  it('updates status', async () => {
    mockUpdate({ ...userBook, status: 'READ' });

    const res = await request(app)
      .put('/userbooks/123/status')
      .send({ status: 'READ' });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('READ');
  });

  it('handles error', async () => {
    mockUpdate(null, true);

    const res = await request(app)
      .put('/userbooks/123/status')
      .send({ status: 'READ' });

    expect(res.status).toBe(500);
  });
});

describe('PUT /userbooks/:id/owned', () => {
  it('updates owned field', async () => {
    mockUpdate({ ...userBook, owned: true });

    const res = await request(app)
      .put('/userbooks/123/owned')
      .send({ owned: true });

    expect(res.status).toBe(200);
    expect(res.body.owned).toBe(true);
  });
});

describe('PUT /userbooks/:id/favorite', () => {
  it('updates favorite field', async () => {
    mockUpdate({ ...userBook, favorite: true });

    const res = await request(app)
      .put('/userbooks/123/favorite')
      .send({ favorite: true });

    expect(res.status).toBe(200);
    expect(res.body.favorite).toBe(true);
  });
});

describe('PUT /userbooks/:id/progress', () => {
  it('updates progress', async () => {
    mockUpdate({ ...userBook, progress: 50 });

    const res = await request(app)
      .put('/userbooks/123/progress')
      .send({ progress: 50 });

    expect(res.status).toBe(200);
    expect(res.body.progress).toBe(50);
  });
});

describe('PUT /userbooks/:id/format', () => {
  it('updates format', async () => {
    mockUpdate({ ...userBook, format: 'ebook' });

    const res = await request(app)
      .put('/userbooks/123/format')
      .send({ format: 'ebook' });

    expect(res.status).toBe(200);
    expect(res.body.format).toBe('ebook');
  });
});

describe('PUT /userbooks/:id/shelves', () => {
  it('updates shelves', async () => {
    mockUpdate({ ...userBook, shelfIds: ['1', '2'] });

    const res = await request(app)
      .put('/userbooks/123/shelves')
      .send({ shelves: ['1', '2'] });

    expect(res.status).toBe(200);
    expect(res.body.shelfIds).toEqual(['1', '2']);
  });
});
