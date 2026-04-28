type Book = {
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
  notes: string
}

export type { Book, UserBook, User, Shelf }