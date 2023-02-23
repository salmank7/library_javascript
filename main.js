// DATA STRUCTURES

class Book {
  constructor(
    title = "Unknown",
    author = "Unknown",
    pages = "0",
    isRead = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(newBook) {
    if (!this.isInLibrary(newBook)) {
      this.books.push(newBook);
    }
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }

  getBook(title) {
    return (this.books = this.books.find((book) => book.title === title));
  }

  isInLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }
}

const library = new Library();

const addBookBtn = document.getElementById("addBook");
const addBookModal = document.getElementById("addBookModal");
const addBookForm = document.getElementById("addBookForm");
const booksGrid = document.getElementById("booksGrid");
const isRead = document.querySelector(".isRead");

const openAddBookModal = () => {
  addBookForm.reset();
  addBookModal.classList.add("active");
};

const closeAddBookModal = () => {
  addBookModal.classList.remove("active");
};
const closeAllModals = () => {
  closeAddBookModal();
};

const handleKeyboardInput = (e) => {
  if (e.key === "Escape") closeAddBookModal();
};
const updateBooksGrid = () => {
  resetBooksGrid();
  for (let book of library.books) {
    if (book.isRead) {
      document.getElementById("isRead").style.background = "red";
    }
    let item = `  <div class="gridItem">
                <p class="name">Title: <span>${book.title}</span></p>
                <p class="author">Author: <span>${book.author}</span></p>
                <p class="Pages">Pages: <span>${book.pages}</span></p>
                <button class="isRead" id="isRead">${
                  book.isRead
                    ? (isRead.style.backgroundColor = "Read")
                    : (isRead.style.backgroundColor = "Havent Read")
                }</button>
                <button>Remove</button>
            </div>`;
    booksGrid.innerHTML += item;
  }
};

const resetBooksGrid = () => {
  booksGrid.innerHTML = "";
};

const getBookFromInput = () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("isRead").checked;
  return new Book(title, author, pages, isRead);
};
getBookFromInput();

const addBook = (e) => {
  e.preventDefault();
  const newBook = getBookFromInput();

  if (library.isInLibrary(newBook)) {
    // will apply error message later
    console.log("the book is already existed");
    return;
  }
  library.addBook(newBook);
  savelocal();
  updateBooksGrid();
  addBookModal.classList.remove("active");
};

const removeBook = (e) => {
  const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
    '"',
    ""
  );
  Book.isRead = !Book.isRead;
  savelocal();
  updateBooksGrid();
};

addBookBtn.onclick = openAddBookModal;
addBookForm.onsubmit = addBook;
window.onkeydown = handleKeyboardInput;

// local storage

const savelocal = () => {
  localStorage.setItem("library", JSON.stringify(library.books));
};

const restoreLocal = () => {
  const books = JSON.parse(localStorage.getItem("library"));
  if (books) {
    library.books = books.map((book) => {
      JSONToBook(book);
    });
  } else {
    library.books = [];
  }
};

const JSONToBook = (book) => {
  return new Book(book.title, book.author, book.pages, book.isRead);
};
