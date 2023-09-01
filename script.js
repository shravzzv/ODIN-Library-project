const formEl = document.querySelector('form')
const libraryEl = document.querySelector('.library')
const allBookEls = document.querySelectorAll('.book')

const myLibrary = []
const toggleRead = (e) => {
  e.currentTarget.classList.toggle('read')
}

function Book(title, author, pages, isRead) {
  this.title = title
  this.author = author
  this.pages = pages
  this.isRead = isRead
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${
      isRead ? 'reading completed' : 'not read yet'
    }.`
  }
  //
}

const createBook = (title, author, pages, isRead) => {
  const book = document.createElement('div')
  const bookTitle = document.createElement('p')
  const bookAuthor = document.createElement('p')
  const bookPages = document.createElement('p')

  book.classList.add('book')
  bookTitle.classList.add('title')
  bookAuthor.classList.add('author')
  bookPages.classList.add('pages')
  isRead && book.classList.add('read')

  bookTitle.textContent = title
  bookAuthor.textContent = author
  bookPages.textContent = pages

  book.appendChild(bookTitle)
  book.appendChild(bookAuthor)
  book.appendChild(bookPages)
  libraryEl.appendChild(book)

  book.addEventListener('click', toggleRead, false)
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault()
  addBookToLibrary(
    e.target.elements.title.value,
    e.target.elements.author.value,
    +e.target.elements.pages.value,
    e.target.isRead.checked
  )
  e.target.reset()
})

Array.from(allBookEls).forEach((book) =>
  book.addEventListener('click', toggleRead)
)

function addBookToLibrary(title, author, pages, isRead) {
  if ((!title, !author, !pages))
    return alert('Please enter the required fields') // server-side form validation

  myLibrary.push(new Book(title, author, pages, isRead))
  createBook(title, author, pages, isRead)
  console.table(myLibrary)
}
