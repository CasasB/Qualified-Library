function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((count, book) => {
    const borrowedCount = book.borrows.filter((borrow) => !borrow.returned).length;
    return count + borrowedCount;
  }, 0);
}

function getMostCommonGenres(books) {
  const genreCounts = books.reduce((counts, book) => {
    const { genre } = book;
    if (counts[genre]) {
      counts[genre] += 1;
    } else {
      counts[genre] = 1;
    }
    return counts;
  }, {});
  
  const sortedGenres = Object.entries(genreCounts).sort(([, countA], [, countB]) => countB - countA);
  
  return sortedGenres.slice(0, 5).map(([name, count]) => ({ name, count }));
}

function getMostPopularBooks(books) {
  const popularBooks = books.map((book) => {
    const { title, borrows } = book;
    const borrowCount = borrows.length;
    return { name: title, count: borrowCount };
  });
  
  return popularBooks.sort((bookA, bookB) => bookB.count - bookA.count).slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorCounts = books.reduce((counts, book) => {
    const { authorId, borrows } = book;
    const borrowCount = borrows.length;
    const author = authors.find((author) => author.id === authorId);
    const authorName = `${author.name.first} ${author.name.last}`;
    
    if (counts[authorName]) {
      counts[authorName] += borrowCount;
    } else {
      counts[authorName] = borrowCount;
    }
    
    return counts;
  }, {});
  
  const popularAuthors = Object.entries(authorCounts).map(([name, count]) => ({ name, count }));
  
  return popularAuthors.sort((authorA, authorB) => authorB.count - authorA.count).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
