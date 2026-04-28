'use strict';

import { put } from './helper.apiRequests';

import type { Shelf } from '../types';


const url = 'http://localhost:3000';

async function updateProgress(bookId:string, progress:number) {
  return put(
    `${url}/userbooks/${bookId}/progress`,
    { progress },
    'There was an error fetching the data - updateProgress'
  );
}

async function updateStatus(bookId:string, status:string) {
  return put(
    `${url}/userbooks/${bookId}/status`,
    { status },
    'There was an error fetching the data - updateStatus'
  );
}

async function updateOwned(bookId:string, owned:boolean) {
  return put(
    `${url}/userbooks/${bookId}/owned`,
    { owned },
    'There was an error fetching the data - updateOwned'
  );
}

async function updateFavorite(bookId:string, favorite:boolean) {
  return put(
    `${url}/userbooks/${bookId}/favorite`,
    { favorite },
    'There was an error fetching the data - updateFavorite'
  );
}

async function updateFormat(bookId:string, format:string[]) {
  return put(
    `${url}/userbooks/${bookId}/format`,
    { format },
    'There was an error fetching the data - updateFormat'
  );
}

async function updateShelves(bookId:string, shelves:Shelf) {
  return put(
    `${url}/userbooks/${bookId}/shelves`,
    { shelves },
    'There was an error fetching the data - updateShelves'
  );
}

export {
  updateProgress,
  updateStatus,
  updateOwned,
  updateFavorite,
  updateFormat,
  updateShelves,
};
