// define global variables
const heading = document.querySelector('h1')
const formEl = document.querySelector('form')
const addBtnEl = document.querySelector('.add')
const libraryEl = document.querySelector('.library')
const closeFormEl = document.querySelector('.cancel')
const allBookEls = document.querySelectorAll('.book')

// Define the Book Class
class Book {
  constructor(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
  }

  info() {
    return `${title} by ${author}, ${pages} pages, ${
      isRead ? 'reading completed' : 'not read yet'
    }.`
  }
}

const myLibrary = [new Book('The Hobbit', 'J.R.R. Tolkien', 293, true)]

const hideFormEl = () => {
  formEl.style.display = 'none'
  libraryEl.style.filter = 'blur(0px)'
  addBtnEl.style.filter = 'blur(0px)'
  libraryEl.style['pointer-events'] = 'all'
}

const showFormEl = () => {
  formEl.style.display = 'block'
  libraryEl.style.filter = 'blur(15px)'
  addBtnEl.style.filter = 'blur(15px)'
  libraryEl.style['pointer-events'] = 'none'
}

// Update the library with the latest book
const updateLibrary = () => {
  const latestBook = myLibrary[myLibrary.length - 1]
  createBookEl(latestBook)
}

// Clear and re-render the entire library
const showLibrary = () => {
  libraryEl.innerHTML = ''
  myLibrary.forEach((book) => createBookEl(book))
}

// Create a DOM element for a book and append it to the library
const createBookEl = (book) => {
  const bkEl = document.createElement('div')
  const bkTitleEl = document.createElement('p')
  const bkAuthorEl = document.createElement('p')
  const bkPagesEl = document.createElement('p')
  const delBtn = document.createElement('div')

  bkEl.classList.add('book')
  bkTitleEl.classList.add('title')
  bkAuthorEl.classList.add('author')
  bkPagesEl.classList.add('pages')
  book.isRead && bkEl.classList.add('read')
  delBtn.classList.add('delete')

  bkTitleEl.textContent = book.title
  bkAuthorEl.textContent = book.author
  bkPagesEl.textContent = book.pages
  delBtn.textContent = '❌'

  bkEl.setAttribute('data-index', myLibrary.length - 1)

  bkEl.appendChild(bkTitleEl)
  bkEl.appendChild(bkAuthorEl)
  bkEl.appendChild(bkPagesEl)
  bkEl.appendChild(delBtn)
  libraryEl.appendChild(bkEl)

  bkEl.addEventListener('click', handleToggleRead)
  delBtn.addEventListener('click', (e) =>
    handleRemoveBook(e, parseInt(bkEl.getAttribute('data-index')))
  )
}

// Event Handlers:

// Handle form submission
const handleSubmit = (e) => {
  e.preventDefault()

  const title = e.target.elements.title.value
  const author = e.target.elements.author.value
  const pages = parseInt(e.target.elements.pages.value)
  const isRead = e.target.elements.isRead.checked

  const newBook = new Book(title, author, pages, isRead)
  myLibrary.push(newBook)

  e.target.reset()
  updateLibrary()
  hideFormEl()
}

// Toggle the 'read' class when a book is clicked
const handleToggleRead = (e) => e.currentTarget.classList.toggle('read')

// Remove a book from library when ❌ is clicked
const handleRemoveBook = (e, index) => {
  e.stopPropagation()
  myLibrary.splice(index, 1)
  showLibrary()
}

// Handle opening the form
const handleOpenForm = (e) => showFormEl()

// Handle closing the form
const handleCloseForm = (e) => {
  formEl.reset()
  hideFormEl()
}

// Attach event listeners to elements
Array.from(allBookEls).forEach((book) =>
  book.addEventListener('click', handleToggleRead)
)
formEl.addEventListener('submit', handleSubmit)
addBtnEl.addEventListener('click', handleOpenForm)
closeFormEl.addEventListener('click', handleCloseForm)

showLibrary()
