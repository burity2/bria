'use strict';

import {
  getBookByEditionKey,
  getBookByWorksKey,
  getBookByIsbn,
} from './apiService';

import { get, post } from './helper.apiRequests';

const localUrl = 'http://localhost:3000';

async function postBook(bookData) {
  const book = await buildBookObject(bookData);

  return post(
    `${localUrl}/books`,
    book,
    'There was an error fetching the data - PostBook'
  );
}

async function getUserBooks() {
  return get(
    `${localUrl}/books`,
    'There was an error fetching the data - GetBooks'
  );
}

export { postBook, getUserBooks };

//helper function to get additional book data and rebuild book object
async function buildBookObject(book) {
  const editionKey = book.cover_edition_key || '';
  const worksKey = book.key?.split('/').pop() || '';

  let editionData = {};
  let worksData = {};

  if (editionKey) {
    try {
      editionData = await getBookByEditionKey(editionKey);
    } catch (error) {
      console.log(error);
    }
  }
  if (worksKey) {
    try {
      worksData = await getBookByWorksKey(worksKey);
    } catch (error) {
      console.log(error);
    }
  }

  if (book.isbn && !editionKey) {
    try {
      const searchResults = await getBookByIsbn(book.isbn);
      if (searchResults.numFoundExact) {
        const foundBook = searchResults.docs[0];
        book = { ...foundBook, ...book };

        const newEditionKey = foundBook.cover_edition_key;
        const newWorksKey = foundBook.key?.split('/').pop();

        if (newEditionKey) {
          try {
            editionData = await getBookByEditionKey(newEditionKey);
          } catch (error) {
            console.log(error);
          }
        }

        if (newWorksKey) {
          try {
            worksData = await getBookByWorksKey(newWorksKey);
          } catch (error) {
            console.log(error);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const isbn = editionData.isbn_13?.[0] || editionData.isbn_10?.[0];

  if (!book.userData) {
    book.userData = {
      format: [''],
      shelfIds: ['64a0c0b0c3f8fa2d1e4c0011', ' 64a0c0b0c3f8fa2d1e4c0002'],
    };
  }

  const newBook = {
    title: book.title,
    authors: book.author_name || book.authors,
    editionKey: editionKey || '',
    worksKey: worksKey || '',
    pages: editionData.number_of_pages || null,
    description: worksData?.description?.value || '',
    publishedDate:
      book.publishedDate || book.first_publish_year
        ? new Date(`${book.first_publish_year}-01-01`)
        : null,
    cover: book.cover_i || null,
    userData: book.userData,
  };

  if (isbn) {
    newBook.isbn = isbn;
  } else {
    if (book.isbn?.trim()) {
      newBook.isbn = book.isbn.trim();
    } else {
      delete newBook.isbn;
    }
  }
  return newBook;
}
