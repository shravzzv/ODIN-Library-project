/* Write a constructor for making “Book” objects. Your book objects should have the book’s title, author, the number of pages, and whether or not you have read the book. 

Put a function into the constructor that can report the book info like so: theHobbit.info() // "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"*/

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

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false)
console.log(theHobbit.info())
