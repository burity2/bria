'use strict';

import { get } from './helper.apiRequests';

const searchUrl = 'https://openlibrary.org/search.json';
const worksUrl = 'https://openlibrary.org/works';
const editionUrl = 'https://openlibrary.org/books';

/**
 * Retrieves book data in an array using a general string from the OpenLibrary API.
 *
 * @async
 * @function getBooksBySearch
 * @param {string} searchString The general search query string to look up
 * @returns The book array from OpenLibrary
 * @throws If the fetch fails or no data is returned
 */
async function getBooksBySearch(searchString) {
  const urlSearchString = searchString.split(' ').join('+');

  const data = await get(
    `${searchUrl}?q=${urlSearchString}`,
    'There was an error fetching the data - getBooksBySearch'
  );

  const filteredData = data.docs.filter(
    (book) => book.cover_edition_key && book.key
  );

  return filteredData;
}

/**
 * Retrieves book data using its ISBN from the OpenLibrary API.
 *
 * @async
 * @function getBookByIsbn
 * @param {string} isbn - The ISBN of the book to look up
 * @returns {Promise<Object>} - The book data from OpenLibrary
 * @throws {Error} If the fetch fails or no data is returned
 */

async function getBookByIsbn(isbn) {
  console.log('in getbookbyisbn');
  console.log(isbn);

  return get(
    `${searchUrl}?isbn=${isbn}`,
    'There was an error fetching the data - getBookByIsbn'
  );
}

/**
 *
 *
 * @async
 * @function getBookByEditionKey
 * @param {string} key
 * @return {Promise<Object>}
 * @throws {Error}
 */

async function getBookByEditionKey(key) {
  return get(
    `${editionUrl}/${key}.json`,
    'There was an error fetching the data - getBookByEditionKey'
  );
}

/**
 *
 *
 * @async
 * @function getBookByWorksKey
 * @param {string} key
 * @return {Promise<Object>}
 * @throws {Error}
 */
async function getBookByWorksKey(key) {
  return get(
    `${worksUrl}/${key}.json`,
    'There was an error fetching the data - getBookByWorksKey'
  );
}

function getBookCover(coverId, size) {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

export {
  getBooksBySearch,
  getBookByIsbn,
  getBookByEditionKey,
  getBookByWorksKey,
  getBookCover,
};
