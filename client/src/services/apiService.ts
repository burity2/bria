'use strict';

import { get } from './helper.apiRequests';

import type { SearchBook, SearchResponse, IsbnSearchResponse, EditionData, WorksData } from '../types';

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

// type apiBook = {
//   author_key: string[],
//   author_name: string[],
//   cover_edition_key: string, // !
//   cover_i: number, // !
//   ebook_access: string,
//   edition_count: number,
//   first_publish_year: number,
//   has_fulltext: boolean,
//   ia: string[],
//   ia_collection: string[],
//   key: string, // !
//   language: string[],
//   lending_edition_s: string,
//   lending_identifier_s: string,
//   publice_scan_b: boolean,
//   series_key: string[],
//   series_name: string[],
//   series_position: string[],
//   title: string,
//



async function getBooksBySearch(searchString: string) {
  const urlSearchString = searchString.split(' ').join('+');

  const data = await get(
    `${searchUrl}?q=${urlSearchString}`,
    'There was an error fetching the data - getBooksBySearch'
  ) as SearchResponse;

  console.log(data);

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

async function getBookByIsbn(isbn: string): Promise<IsbnSearchResponse>  {

  return get(
    `${searchUrl}?isbn=${isbn}`,
    'There was an error fetching the data - getBookByIsbn'
  )
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

async function getBookByEditionKey(key: string): Promise<EditionData> {
  const data = await get(
    `${editionUrl}/${key}.json`,
    'There was an error fetching the data - getBookByEditionKey'
  );

  console.log(data);
  return data;
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
async function getBookByWorksKey(key: string): Promise<WorksData> {
  const data = get(
    `${worksUrl}/${key}.json`,
    'There was an error fetching the data - getBookByWorksKey'
  );

  console.log(data);
  return data;
}

function getBookCover(coverId:number, size:string) {
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
