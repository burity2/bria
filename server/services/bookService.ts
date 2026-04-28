import Book from '../models/books.js';

export async function findOrCreateBook(data: any) {
  const { isbn, ...bookData } = data;

  const query = isbn ? { isbn: isbn.trim() } : null;

  if (query) {
    const existing = await Book.findOne(query);
    if (existing) return existing;
  }

  return await Book.create({
    ...bookData,
    isbn: isbn ? isbn.trim() : undefined,
  });
}
