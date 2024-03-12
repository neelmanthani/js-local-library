function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let checkedOut = books.filter((book) => !book.borrows[0].returned);
  let returned = books.filter((book) => book.borrows[0].returned);

  return [checkedOut, returned];
}

function getBorrowersForBook(book, accounts) {
  let borrowers = book.borrows.map((borrow) => {
    const account = accounts.find((acc) => acc.id === borrow.id);
    const returned = borrow.returned;
    return {...account, returned};
  })

  if (borrowers.length > 10) {
    return borrowers.slice(0, 10);
  }

  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
