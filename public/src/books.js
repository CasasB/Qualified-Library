function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowed = books.filter((book) => book.borrows[0].returned === false);
  const returned = books.filter((book) => book.borrows[0].returned === true);
  return [borrowed, returned];
}

function getBorrowersForBook(book, accounts) {
  const borrowers = book.borrows.map(({ id, returned }) => {
    const account = accounts.find((acc) => acc.id === id);
    return { ...account, returned };
  });
  return borrowers.slice(0, 10); // Return only the first 10 borrowers
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
