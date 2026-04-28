import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('GET /user-books', () => {
  it('should return books successfully', async () => {
    const res = await request(app).get('/books');
    expect(res.status).toBe(201);
  });
});
describe('Update book status', () => {
  const testId = '69e9eb98da6a35387e53ae41';

  it('should update book status successfully', async () => {
    const res = await request(app)
      .put(`/userbooks/${testId}/status`)
      .send({ status: 'READ' });

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });

  it('should fail with invalid book id status', async () => {
    const res = await request(app)
      .put(`/userbooks/1/status`)
      .send({ status: 'READ' });

    expect(res.status).toBe(500);
  });
});