import UserBook from '../models/userBooks.js';

export async function ensureUserBook({ userId, bookId, userData }: any) {
  let userBook = await UserBook.findOne({ userId, bookId });

  if (userBook) return userBook;

  userBook = await UserBook.create({
    userId,
    bookId,
    shelfIds: ['64a0c0b0c3f8fa2d1e4c0011', '64a0c0b0c3f8fa2d1e4c0002'],
    format: userData?.format,
  });

  return userBook;
}
