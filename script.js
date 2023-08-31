const formEl = document.querySelector('form')
const libraryEl = document.querySelector('.library')

formEl.addEventListener('submit', (e) => {
  e.preventDefault()
  addBookToLibrary(
    e.target.elements.title.value,
    e.target.elements.author.value,
    +e.target.elements.pages.value,
    e.target.isRead.checked
  )
})

const myLibrary = []

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
}

function addBookToLibrary(title, author, pages, isRead) {
  if ((!title, !author, !pages))
    return alert('Please enter the required fields') // server-side form validation

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

  myLibrary.push(new Book(title, author, pages, isRead))
  console.table(myLibrary)
}
