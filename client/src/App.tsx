import { Routes, Route } from 'react-router';
import { useEffect, useState } from 'react';
import WelcomePage from './components/WelcomePage/WelcomePage';
import { getUserBooks } from './services/bookService.js';

import './App.css';
import Home from './components/Home/Home';
import Library from './components/Library/Library';
import Layout from './components/Layout/Layout.jsx';

type BookProps = {
  worksKey?: string,
  editionKey?: string,
  isbn?: string,
  title: string,
  authors: string[],
  pages?: number,
  cover?: number,
  publishedDate?: Date,
  description?: string,
  genres?: string[],
  rating?: number
}

type UserBookProps = {

}

function App() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchUserBooks() {
      try {
        const userBooks = await getUserBooks();
        const filteredBooks = userBooks.filter((book) => {
          if (book.bookId.cover) return book;
        });
        setBooks(filteredBooks);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserBooks();
  }, []);


  return (
    <Routes>
      <Route path='/' element={<WelcomePage />}></Route>
      <Route
        path='/home'
        element={
          <Layout books={books} setBooks={setBooks}>
            <Home books={books} setBooks={setBooks} />
          </Layout>
        }
      ></Route>
      <Route
        path='/library'
        element={
          <Layout books={books} setBooks={setBooks}>
            <Library books={books} setBooks={setBooks} />
          </Layout>
        }
      ></Route>
    </Routes>
  );
}

export default App;
