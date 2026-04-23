import { useState } from 'react';
import './AddBookManual.css'

function AddBookManual({ onAddBook }) {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [isbn, setIsbn] = useState('');
  const [pages, setPages] = useState('');
  const [format, setFormat] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    const book = {
      title,
      authors: authors.split(',').map((a) => a.trim()),
      isbn: isbn.trim() || undefined,
      pages: Number(pages),
      userData: { format },
    };

    onAddBook(book);

    // reset
    setTitle('');
    setAuthors('');
    setIsbn('');
    setPages('');
    setFormat([]);
  }

  function toggleFormat(value) {
    setFormat((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
  }

  return (
    <form className='addbook-form' onSubmit={handleSubmit}>
      <input
        className='addbook-input'
        placeholder='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        className='addbook-input'
        placeholder='authors (comma separated)'
        value={authors}
        onChange={(e) => setAuthors(e.target.value)}
        required
      />

      <input
        className='addbook-input'
        placeholder='isbn'
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
      />

      <input
        className='addbook-input'
        type='number'
        placeholder='pages'
        value={pages}
        onChange={(e) => setPages(e.target.value)}
      />

      <div className='addbook-checkbox-group'>
        {['physical', 'kindle', 'audiobook'].map((opt) => (
          <label key={opt} className='addbook-checkbox-label'>
            <input
              className='addbook-checkbox'
              type='checkbox'
              checked={format.includes(opt)}
              onChange={() => toggleFormat(opt)}
            />
            {opt}
          </label>
        ))}
      </div>

      <button type='submit'>
        Add
      </button>
    </form>
  );
}

export default AddBookManual;
