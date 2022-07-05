import { Book, Store, UI } from './booksClass.js';

// Event: Display Books
document.addEventListener('DOMContentLoaded', () => {
  UI.diplayBooks();
});
// Event: Add book To list

document.querySelector('#add-book').addEventListener('submit', (e) => {
  e.preventDefault();

  // get input values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // validations
  // Validate
  if (title === '' || author === '' || isbn === '') {
    UI.showAlert(' Please fill in all fields', 'invalid');
  } else {
    // instantiate book
    const book = new Book(title, author, isbn);

    // ADD BOOK
    UI.addBooksToList(book);

    // Add book to store
    Store.addBook(book);

    // Show success message
    UI.showAlert(' Book Added', 'success');

    // CLEAR FIELD
    UI.clearfields();
  }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.removeBook(e.target);
  // Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});
