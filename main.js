class Book {
    constructor(
        title = "unknown",
        author = "Unknown",
        pages = 0,
        isRead = false
    ) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }
}

class Library{
    constructor(){
        this.books = []
    }
    addNewBook(newBook){
        if(!this.isInLibrary(newBook)){
            this.books.push(newBook)
        }
    }
    isInLibrary(newBook){
        return this.books.some((book)=> book.title === newBook.title)
    }
}


const addBook = document.getElementById("addBook")
const BooksGrid = document.getElementById("booksGrid")
const modal = document.getElementById("addBookModal")

// book details
const bookTitle = document.getElementById("title")
const bookAuthor = document.getElementById("author")
const bookPages = document.getElementById("pages")
const bookIsRead = document.getElementById("isRead")
const modalSubmit = document.getElementById("modalSubmit")

const library = new Library()


addBook.addEventListener("click", (e)=>{
    modal.classList.add("active")
})
