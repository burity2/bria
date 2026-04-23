import { useState, useRef, useEffect } from 'react';
import { getBooksBySearch, getBookCover } from '../../../services/apiService';
import './SearchAddBook.css';
import '../add.global.css'

function SearchAddBook({ onAddBook }) {
  const [searchString, setSearchString] = useState('');
  const [results, setResults] = useState([]);
  const containerRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await getBooksBySearch(searchString);
    setResults(data);
    setSearchString('');
  }

  function handleSelect(book) {
    onAddBook(book);
    setResults([]);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setResults([]);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='searchBar-container' ref={containerRef}>

      <form className='searchbar-form' onSubmit={handleSubmit}>
        <input
          className='searchbar-search-input'
          type='search'
          placeholder='search for a book...'
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        <button type='submit'>
          Search
        </button>
      </form>

      {results.length > 0 && (
        <div className='search-results-container'>
          {results.map((book, index) => (
            <div key={index} className='search-result-item'>

              <div className='search-result-item-book-details'>

                {book.cover_i && (
                  <img
                    src={getBookCover(book.cover_i, 'S')}
                    alt={`Cover of ${book.title}`}
                    className='search-result-cover'
                  />
                )}

                <div className='search-result-text'>
                  <strong>{book.title}</strong>
                  {book.author_name && (
                    <span> by {book.author_name.join(', ')}</span>
                  )}
                </div>

              </div>

              <button
                className='search-result-add-button'
                onClick={() => handleSelect(book)}
              >
                +
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchAddBook;