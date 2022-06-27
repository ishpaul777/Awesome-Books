/* eslint-disable max-classes-per-file */
// Book class: Represents one book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// UI class: Handle UI tasks
class UI {
  static diplayBooks() {
    const books = Store.getBooks();// getting the books from local storage

    // looping over the stored books and add it to list
    books.forEach((book) => UI.addBooksToList(book));
  }

  static addBooksToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class="remove-btn remove">&times;</a></td>
        `;

    list.appendChild(row);
  }

  // for removing book
  static removeBook(el) {
    if (el.classList.contains('remove')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    if (className === 'invalid') {
      div.innerHTML = '<i class="bi bi-x-circle"></i>';
    } else if (className === 'success') {
      div.innerHTML = '<i class="bi bi-check2-all"></i>';
    }
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.wrapper');
    const form = document.querySelector('#add-book');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 1000);
  }

  // for clearing input fields after adding a book
  static clearfields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

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
