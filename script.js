function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    let readYet;

    this.info = function () {
        if (this.read === true) {
            readYet = "read";
        }
        else {
            readYet = "not read yet"
        }
        return `${this.title} by ${this.author}, ${this.pages}, ${readYet}`;
    }

    this.toggle = function () {
        this.read = !this.read;
    }
}

let myLibrary = [];
function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

function displayBooks() {
    myLibrary.forEach(book => console.log(book.info()));
}


let modal = document.querySelector("dialog");
let newBook = document.querySelector(".new_book");

//close the modal if you click out of it
window.onclick = function(e){
    if (e.target == modal){
        modal.close(); 
    }
}

newBook.addEventListener('click', () => {
    modal.showModal();
    document.querySelector("form").reset();
})


//if the form is submitted, call the formValid function to validate inputs
//if the inputs are not valid, call e.preventDefault()
document.querySelector("form").addEventListener('submit', (e)=>{
    const titleInput = document.getElementById("title").value;
    const authorInput = document.getElementById("author").value;
    const num_pages = document.getElementById("num_pages").value;
    const read = document.getElementById("checkbox").checked;

    if (formValid(titleInput, authorInput, num_pages)) {
        addBookToLibrary(titleInput, authorInput, num_pages, read);
        updateBackground();
    }
    else {
        e.preventDefault();
    }
})

function formValid(title, author, pages) {
    let error = document.querySelector(".error-message");
    error.innerText = '';
    let passed = true;

    //presence check
    if (title === '' || author === '' || pages === '') {
        error.innerText = "Empty fields not permitted"
        passed = false;
    }

    //duplicate book check

    if (bookNames.includes(title)) {
        error.innerText = "This book already exists in your library";
        passed = false;
        console.log('changed');
    }

    console.log(error)
    return passed;
}

//if a new book is added, the background is updated to show the new book
let bookNames = [];
function updateBackground() {
    let container = document.querySelector('.books-container');
    container.innerHTML = '';
    let index = 0;

    myLibrary.forEach(eachBook => {
        let div = document.createElement('div');
        div.classList.add("book");
        div.setAttribute('data-index', index);//adding index to data set so that when remove is pressed both gui and library can be removed

        let title = document.createElement('div');
        title.innerText = "\"" + eachBook.title + "\"";
        title.classList.add('title');

        let author = document.createElement('div');
        author.innerText = eachBook.author;
        author.classList.add('author');

        let pages = document.createElement('div');
        pages.innerText = eachBook.pages + " pages";
        pages.classList.add('pages');

        let read = document.createElement('button');
        if (eachBook.read) {
            read.innerText = "Read";
            read.style.backgroundColor = "lightgreen";
            read.dataset.color = "green";
        }
        else {
            read.innerText = "Not Read";
            read.style.backgroundColor = "red";
            read.dataset.color = "red";
        }
        read.classList.add('read');

        let remove = document.createElement('button');
        remove.innerText = "Remove";
        remove.classList.add('remove');

        div.appendChild(title);
        div.appendChild(author);
        div.appendChild(pages);
        div.appendChild(read);
        div.appendChild(remove);
        container.appendChild(div);

        //adds an event listner to each remove button
        //if clicked, removes the button from the myLibrary array and updates the background
        remove.addEventListener('click', () => {
            myLibrary.splice(index - 1, 1);
            updateBackground();
        })

        read.addEventListener('click', () => {
            if (read.innerText === "Read") {
                read.style.backgroundColor = "red";
                read.innerText = "Not Read";
            }
            else {
                read.style.backgroundColor = "lightgreen";
                read.innerText = "Read";
            }
        })

        bookNames.push(eachBook.title);
        index++;

    })
}

//remove a book if the remove button is pressed

// function Library(books){
//     this.books = books;
// }

// Book.prototype.sayHello = function(){
//     console.log("hello Book");
// }


// Object.setPrototypeOf(Library.prototype, Book.prototype)
// Object.getPrototypeOf(Library.prototype);

// let book = new Book("harry", "tolkein", "255", true);
// let library = new Library('fiction');
