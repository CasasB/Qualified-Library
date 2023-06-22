function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) =>
    a.name.last.toLowerCase() > b.name.last.toLowerCase() ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  const { id: accountId } = account;
  return books.reduce((total, { borrows }) => {
    const borrowCount = borrows.filter(({ id }) => id === accountId).length;
    return total + borrowCount;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  const { id: accountId } = account;
  return books
    .filter(({ borrows }) => borrows.some(({ id, returned }) => id === accountId && !returned))
    .map((book) => {
      const { authorId, ...rest } = book;
      const author = authors.find(({ id }) => id === authorId);
      return { ...rest, author };
    });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
