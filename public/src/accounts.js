function findAccountById(accounts, id) {
  return accounts.find((account) => account.id == id);
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1)
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i].borrows.length; j++) {
      if (books[i].borrows[j].id === account.id)
        total++;
    }
  }

  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksPossessed = books.filter((book) => book.borrows.some((borrow) => {
   return borrow.id === account.id && !borrow.returned;
  }))

  const res = booksPossessed.map((book) => { 
    const author = authors.find((author => author.id === book.authorId))
    return {...book, author} 
  })

  return res;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
