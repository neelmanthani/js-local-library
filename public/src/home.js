function getTotalBooksCount(books) {
  let total = books.reduce((total, book) => total+=1, 0);
  return total;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.filter((book) => !book.borrows[0].returned).length;
}

function getMostCommonGenres(books) {
  let genreCounts = {};
  books.forEach((book) => {
    if (!(book.genre in genreCounts)) {
      genreCounts[book.genre] = 1;
    } else {
      genreCounts[book.genre] += 1;
    }
  })

  let sortedGenres = Object.keys(genreCounts).sort((genreA, genreB) => genreCounts[genreB] - genreCounts[genreA]);
  let sortedGenreCounts = sortedGenres.map((genre) => {return {name: genre, count: genreCounts[genre]}})

  if (sortedGenreCounts.length > 5) {
    return sortedGenreCounts.slice(0, 5)
  }

  return sortedGenreCounts;
}

function getMostPopularBooks(books) {
  let borrowCounts = [];

  books.forEach((book) => {
    borrowCounts.push({name: book.title, count: book.borrows.length})
  })

  borrowCounts.sort((bookA, bookB) => bookB.count - bookA.count);

  if (borrowCounts.length > 5){
    return borrowCounts.slice(0, 5);
  }

  return borrowCounts;
}

function getAuthorCounts(books, authors){
  let authorCounts = {};
  books.forEach((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    const name = `${author.name.first} ${author.name.last}`;
    if (!(name in authorCounts)) {
      authorCounts[name] = book.borrows.length;
    } else {
      authorCounts[name] += book.borrows.length;
    }
  })

  return authorCounts;
}

function getMostPopularAuthors(books, authors) {
  let authorCounts = {};
  authorCounts = getAuthorCounts(books, authors);

  const sortedAuthors = Object.keys(authorCounts).sort((authorA, authorB) => authorCounts[authorB] - authorCounts[authorA]);

  let res = sortedAuthors.map((name) => {
    return {name, count: authorCounts[name]}
  });

  if (res.length > 5){
    return res.slice(0, 5);
  }

  return res;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
