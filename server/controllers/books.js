'use strict';

const Book = require('./../models/books.js');
const UserBook = require('./../models/userBooks.js');

const DEFAULT_USER_ID = '64a0c0b0c3f8fa2d1e4b0001';

async function postBook (req, res) {
  const {
    title,
    authors,
    cover,
    worksKey,
    editionKey,
    pages,
    publishedDate,
    description,
    userData,
  } = req.body;
  let { isbn } = req.body;
  isbn = typeof isbn === 'string' && isbn.trim() ? isbn.trim() : undefined;

  try {
    let book;
    //TODO: Arthur > simplify those lines below, I disapprove this double Book.create thing
    if (isbn) {
      book = await Book.findOne({ isbn: isbn }); //TODO: this won't add new books if the isbn is empty if there is at least one entry in the db that has no isbn
      // no book is found for this isbn then add it
      if (!book) {
        book = await Book.create({
          title,
          authors,
          isbn,
          cover,
          worksKey,
          editionKey,
          pages,
          publishedDate,
          description,
        });
      }
    } else {
      book = await Book.create({
          title,
          authors,
          cover,
          worksKey,
          editionKey,
          pages,
          publishedDate,
          description,
        });
    }

    //add book for the user as well
    let userBook = await UserBook.findOne({ userId: DEFAULT_USER_ID, bookId: book._id });
    if (!userBook) {
      userBook = await UserBook.create({
        userId: DEFAULT_USER_ID,
        bookId: book._id,
        shelfIds: ['64a0c0b0c3f8fa2d1e4c0011', '64a0c0b0c3f8fa2d1e4c0002'],
        format: userData.format
      })
    }

    //rebuild correctly by fetching the book
    let bookToSendBack = await UserBook.findOne({ _id: userBook._id }).populate('bookId');
    res.status(201).json(bookToSendBack);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong when adding to the database - postBook'});
  }
}


module.exports = { postBook };