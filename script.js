const formEl = document.querySelector('form')

formEl.addEventListener('submit', (e) => {
  e.preventDefault()
  addBookToLibrary(
    e.target.elements.title.value,
    e.target.elements.author.value,
    +e.target.elements.pages.value,
    e.target.isRead.checked
  )
})

const myLibrary = [
  { title: 'The Hobbit', author: 'J.R.R. Tolkien', pages: 295, isRead: false },
  {
    title: `Man's Search For Meaning`,
    author: 'Viktor E. Frankl',
    pages: 154,
    isRead: true,
  },
]

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
  if ((!title, !author, !pages)) return

  myLibrary.push({ title, author, pages, isRead })
}
