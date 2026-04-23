import { useState } from 'react';

import SearchAddBook from '../SearchAddBook/SearchAddBook';
import AddBookIsbn from '../AddBookIsbn/AddBookIsbn';
import AddBookManual from '../AddBookManual/AddBookManual';

import { postBook } from '../../../services/bookService';

import './AddBook.css';

function AddBook({ books, setBooks }) {
  const [mode, setMode] = useState('search');

  async function handleAddBook(book) {
    try {
      const newBook = await postBook(book);
      setBooks((old) => [newBook, ...old]);
      console.log('Book added:', newBook);
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  }

  return (
    <div className='container'>
      <div className='addbook-title'>
        <h2>add book to library</h2>
      </div>
      <div className='addbook-layout'>
        <div className='addbook-sidebar'>
          <button onClick={() => setMode('search')}>Search</button>
          <button onClick={() => setMode('isbn')}>Add by ISBN</button>
          <button onClick={() => setMode('manual')}>Manual</button>
        </div>

        <div className='addbook-content'>
          {mode === 'search' && <SearchAddBook onAddBook={handleAddBook} />}
          {mode === 'isbn' && <AddBookIsbn onAddBook={handleAddBook} />}
          {mode === 'manual' && <AddBookManual onAddBook={handleAddBook} />}
        </div>
      </div>
    </div>
  );
}

export default AddBook;
