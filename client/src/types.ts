type Book = {
  worksKey?: string,
  editionKey?: string,
  isbn?: string,
  title: string,
  authors: string[],
  pages?: number | null,
  cover?: number | null,
  publishedDate?: Date | null,
  description?: string,
  genres?: string[],
  rating?: number
}

type UserBook = {
  userId: string,
  bookId: Book,
  shelfIds?: string[],
  progress: number,
  reads?: Reads[],
  readCount: number,
  read: boolean,
  owned: boolean,
  favorite: boolean,
  status: string,
  format: string[]
}

type User = {
 username: string,
 email: string
}

type Shelf = {
  userId: string,
  title: string,
  description?: string
}

type Reads = {
  dateStarted?: Date,
  dateCompleted?: Date,
  rating?: number,
  notes?: string
}

type SearchBook = {
  cover_edition_key?: string,
  key?: string,
  title?: string,
  author_name?: string[],
  first_publish_year?: number,
  cover_i?: number,
  isbn?: string | string[]
}

type SearchResponse = {
  docs: SearchBook[];
}

type PostBookPayload = Book & {
  userData: {
    format: string[];
  };
};

type IsbnSearchResponse = SearchResponse &{
  numFoundExact?: number;
};

type EditionData = {
  isbn_13?: string[];
  isbn_10?: string[];
  number_of_pages?: number;
};

type WorksData = {
  description?: string | { value?: string };
};

export type { Book, UserBook, User, Shelf, SearchBook, SearchResponse, PostBookPayload, IsbnSearchResponse, EditionData, WorksData }