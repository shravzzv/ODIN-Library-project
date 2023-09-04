const formEl = document.querySelector('form')
const libraryEl = document.querySelector('.library')
const allBookEls = document.querySelectorAll('.book')

const myLibrary = [new Book('The Hobbit', 'J.R.R. Tolkien', 293, false)]

function Book(title, author, pages, isRead) {
  this.title = title
  this.author = author
  this.pages = pages
  this.isRead = isRead
}

Book.prototype.info = function () {
  return `${title} by ${author}, ${pages} pages, ${
    isRead ? 'reading completed' : 'not read yet'
  }.`
}

const toggleRead = (e) => e.currentTarget.classList.toggle('read')

const removeBook = (e, index) => {
  e.stopPropagation()
  myLibrary.splice(index, 1)
  showLibrary()
}

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

  bkEl.addEventListener('click', toggleRead)
  delBtn.addEventListener('click', (e) =>
    removeBook(e, parseInt(bkEl.getAttribute('data-index')))
  )
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault()

  const title = e.target.elements.title.value
  const author = e.target.elements.author.value
  const pages = parseInt(e.target.elements.pages.value)
  const isRead = e.target.elements.isRead.checked

  const newBook = new Book(title, author, pages, isRead)
  myLibrary.push(newBook)

  e.target.reset()
  updateLibrary()
  formEl.style.display = 'none'
})

Array.from(allBookEls).forEach((book) =>
  book.addEventListener('click', toggleRead)
)

const updateLibrary = () => {
  // Get the latest book added
  const latestBook = myLibrary[myLibrary.length - 1]
  // Create a DOM element for the latest book and append it to the library
  createBookEl(latestBook)
}

function showLibrary() {
  // Clear the library container first
  libraryEl.innerHTML = ''
  // Re-create book elements for the entire library
  myLibrary.forEach((book) => createBookEl(book))
}
showLibrary()

// add new book
const addBtnEl = document.querySelector('.add')
const addBook = (e) => {
  formEl.style.display = 'block'
}
addBtnEl.addEventListener('click', addBook)

const closeFormEl = document.querySelector('.cancel')
const closeForm = (e) => {
  formEl.reset()
  formEl.style.display = 'none'
}
closeFormEl.addEventListener('click', closeForm)
