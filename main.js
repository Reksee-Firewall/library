const myLibrary = []; 

function Book(name, author, numberOfPages, isRead) {
    this.name = name; 
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
    this.toString = function() {
        return(`${this.name} by ${this.author}, ${this.numberOfPages}, isRead: ${this.isRead}.`); 
    };
}   

function addBookToLibrary() {
    let name, author='null', numberOfPages='null', isRead=false;
    alert(`Enter blank space to stop the execution.`);
    while(true) {
        name = prompt(`Insert book's name: `);
        if (name.trim() === '') break;
        author = prompt(`Who wrote ${name}? `);
        numberOfPages = prompt(`How many pages does ${name} have? `);
        isRead = prompt(`Have you already read it? [yes/no]: `) === 'yes';

        const newBook = new Book(name, author, numberOfPages, isRead);
        myLibrary.push(newBook);;

        alert(`"${name}" by ${author} has been added to the Library.`);
    }
    alert("Library addition operation is over.");
}

function removeBookFromLibrary() {
    const number = prompt("What's the index of the book to be removed within the Library?");
    myLibrary.splice(myLibrary.indexOf(number), 1);
}

function showBook() {
    const number = Number(prompt("What's the index of the book to be shown within the Library?"));
    const numberOfBooks = myLibrary.length;
    if ((number < 0) || (number > numberOfBooks - 1)) 
        return ("There's no such book within the Library.");
    return (myLibrary[number].toString());
}

function showLibrary() {
    return myLibrary.toString();
}  

alert(`Welcome to the Virtual Library! \nEnter blank space to stop execution.`);
let entry = '';
while(true) {
    entry = prompt(`How would you like to proceed? \nAdd [1] | Remove [2] | Show Library [3] | Show Book [4]`);
    if (entry === "1") {
        addBookToLibrary();
    } else if (entry === "2") {
        removeBookFromLibrary();
    } else if (entry === "3") {
        alert(showLibrary());
    } else if (entry === "4") {
        alert(showBook());
    } else {
        break;
    }
}
alert("Library is closed.");