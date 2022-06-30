/* eslint-disable max-classes-per-file */
// Book class: Represents one book
export class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// Store Class: Handles Storage
export class Store {
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
export class UI {
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

    const container = document.querySelector('.input-books');
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
