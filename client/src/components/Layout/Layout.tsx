import './Layout.css';
import NavBar from '../NavBar/NavBar';
import type { UserBook } from '../../types';

type LayoutProps = {
  children: React.ReactNode;
  books: UserBook[];
  setBooks: (books: UserBook[]) => void;
}

function Layout({ children, books, setBooks }: LayoutProps) {
  return (
    <div className='layout-container'>
      <NavBar books={books} setBooks={setBooks} />
      {children}
    </div>
  );
}

export default Layout;
