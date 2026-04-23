import './../PickBook/PickBook.css';

function PickBookToBuy({
  getRandomBooks,
  books,
  setBooks,
  setBooksPicked,
  setMode,
  reset,
  wantShelfId,
  amount,
  setAmount,
  length,
  setLength,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    const pickedBooks = pickBooks(
      books,
      length,
      amount,
      wantShelfId,
      getRandomBooks
    );
    console.log(pickedBooks);
    setBooksPicked(pickedBooks);
    setMode('picked');
    reset();
  }

  return (
    <form className='pickbook-form-container' onSubmit={handleSubmit}>
      <div className='pickbook-form-input-container'>
        <label className='form-input-label'>
          how many picks would you like?
        </label>
        <input
          className='form-input-input'
          type='range'
          min='1'
          max='3'
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        ></input>
      </div>
      <div className='form-input-range'>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </div>
      <div className='pickbook-form-input-container'>
        <label className='form-input-label'>length</label>
        <input
          className='form-input-input'
          type='range'
          min='1'
          max='3'
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        ></input>
      </div>
      <div className='form-input-range'>
        <span>Short</span>
        <span>Medium</span>
        <span>Long</span>
      </div>
      <button type='submit'>pick</button>
    </form>
  );
}

export default PickBookToBuy;

function pickBooks(books, length, amount, wantShelfId, getRandomBooks) {
  console.log('amount: ', amount);
  const filteredWantBooks = books.filter((book) => {
    return book.shelfIds.includes(wantShelfId);
  });
  const filteredLengthBooks = filteredWantBooks.filter((book) => {
    if (length === 1) return book.bookId.pages < 250;
    if (length === 2)
      return book.bookId.pages >= 250 && book.bookId.pages <= 450;
    if (length === 3) return book.bookId.pages > 450;
  });
  const pickedBooks = getRandomBooks(filteredLengthBooks, amount);
  return pickedBooks;
}
