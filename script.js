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

const createBookEl = (book) => {
  const bkEl = document.createElement('div')
  const bkTitleEl = document.createElement('p')
  const bkAuthorEl = document.createElement('p')
  const bkPagesEl = document.createElement('p')

  bkEl.classList.add('book')
  bkTitleEl.classList.add('title')
  bkAuthorEl.classList.add('author')
  bkPagesEl.classList.add('pages')
  book.isRead && bkEl.classList.add('read')

  bkTitleEl.textContent = book.title
  bkAuthorEl.textContent = book.author
  bkPagesEl.textContent = book.pages

  bkEl.appendChild(bkTitleEl)
  bkEl.appendChild(bkAuthorEl)
  bkEl.appendChild(bkPagesEl)
  libraryEl.appendChild(bkEl)

  bkEl.addEventListener('click', toggleRead)
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault()

  myLibrary.push(
    new Book(
      e.target.elements.title.value,
      e.target.elements.author.value,
      parseInt(e.target.elements.pages.value),
      e.target.elements.isRead.checked
    )
  )
  e.target.reset()
  updateLibrary()
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

;(function showLibrary() {
  myLibrary.forEach((book) => createBookEl(book))
})()
