'use strict'

function onInit() {
	renderBooks()
}

function renderBooks() {
	var books = getBooks()
	var strHtmls = books.map(
		(book) =>
			`<tr>
       <td>${book.id}</td>
       <td>${book.name}</td>
       <td>${book.price}</td>
       <td>${book.rate}</td>
       <td><button class="read" onclick="onReadBook('${book.id}')">Read</button></td>
       <td><button class="update" onclick="onUpdateBook('${book.id}')">Update</button></td>
       <td><button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button></td>
       
          </tr>`
	)
	document.querySelector('.books-container').innerHTML = strHtmls.join('')
}

function onUpdateBook(bookId) {
	const book = getBookById(bookId)
	var newBookPrice = +prompt('Enter new price', book.price)
	if (newBookPrice) {
		const book = updateBook(bookId, newBookPrice)
		renderBooks()
		alert(`book new price is ${book.price}`)
	}
}

function onRemoveBook(bookId) {
	removeBook(bookId)
	renderBooks()
	alert(`book is deleted`)
}

function onAddBook() {
	const bookName = prompt(`Please enter the Book Name:`)
	const bookPrice = prompt(`Please enter the Book Price:`)
	if (bookName && bookPrice) {
		addBook(bookName, bookPrice)
		renderBooks()
		alert(`book added`)
	}
}

function onReadBook(bookId) {
	const book = getBookById(bookId)
	var elModal = document.querySelector('.modal')
	elModal.innerHTML = `<h3>${book.name}</h3>
    <h4>book price: <span>${book.price}</span>$</h4>
    <h5>book picture</h5>
    <img src="https://pngimg.com/uploads/book/book_PNG2111.png" alt="book-image" />
    <h4>Change book rate:</h4>
    <button class="up" onclick="onChangeRate('${bookId}' , 1)">+</button>
    <span class="book-rate">${book.rate}</span>
    <button class="down" onclick="onChangeRate('${bookId}' ,-1)">-</button>
    <button class="close-modal" onclick="onCloseModal()">Close</button>`
	elModal.classList.add('open')
}

function onCloseModal() {
	document.querySelector('.modal').classList.remove('open')
}

function onChangeRate(bookId, diff) {
	var newRate = getChangeRate(bookId, diff)
    var elSpanRate = document.querySelector('.book-rate')
    elSpanRate.innerHTML = newRate
	renderBooks()
}




