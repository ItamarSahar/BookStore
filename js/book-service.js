'use strict'
const STORAGE_KEY = 'booksDB'
var gBooks
_createBooks()

//default img  'https://pngimg.com/uploads/book/book_PNG2111.png'

function getBooks() {
	return gBooks
}

function getBookById(bookId) {
	const book = gBooks.find((book) => bookId === book.id)
	return book
}

function addBook(name, price) {
	const book = _createBook(name, price)
	gBooks.unshift(book)
	_saveBooksToStorage()
	return book
}

function removeBook(bookId) {
	const bookIdx = gBooks.findIndex((book) => bookId === book.id)
	gBooks.splice(bookIdx, 1)
	_saveBooksToStorage()
}

function updateBook(bookId, bookPrice) {
	const book = getBookById(bookId)
	book.price = bookPrice
	_saveBooksToStorage()
	return book
}
//diff undifind need to fix
function getChangeRate(bookId, diff) {
	const book = getBookById(bookId)
	if (book.rate + diff < 0 || book.rate + diff > 10) return book.rate
	book.rate += diff
    return book.rate
}

function _createBook(name, price = getRandomIntInclusive(10, 100)) {
	return {
		id: makeId(),
		name,
		price,
		img: 'https://pngimg.com/uploads/book/book_PNG2111.png',
		rate: 0,
	}
}

function _createBooks() {
	var books = loadFromStorage(STORAGE_KEY)
	if (!books || !books.length) {
		books = []

		books.push(_createBook('book1'))
		books.push(_createBook('book2'))
		books.push(_createBook('book3'))
	}
	gBooks = books
	_saveBooksToStorage()
}

function _saveBooksToStorage() {
	saveToStorage(STORAGE_KEY, gBooks)
}
