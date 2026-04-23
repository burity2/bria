

import { useState } from 'react';
import { getBookByIsbn } from '../../../services/apiService';

import '../add.global.css'

function AddBookIsbn({ onAddBook }) {
  const [isbn, setIsbn] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await getBookByIsbn(isbn);

    if (!result.numFoundExact) {
      console.log('No book found');
      return;
    }

    const book = result.docs[0];

    onAddBook(book);
    setIsbn('');
  }

  return (
    <form className='searchbar-form' onSubmit={handleSubmit}>
      <input
      className='searchbar-search-input'
        type="text"
        placeholder="ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddBookIsbn;