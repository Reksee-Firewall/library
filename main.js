const initializeButton = document.getElementById("initialize");
const background = document.getElementById("background");
const frontpage = document.getElementById("frontpage");

const myLibrary = []; 

// Protótipos são utilizados para herança. A atribuição seria, ao invés disto, direta.
// Construtor.
function Book(name, author, numberOfPages, isRead) {
    this.name = name; 
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
    this.toString = function() {
        return(`[${this.name} by ${this.author}; ${this.numberOfPages}; isRead: ${this.isRead}]`); 
    };
}   

function initialize() {

    const rightBorderDeco = document.querySelector("#background img:first-child");
    const leftBorderDeco = document.querySelector("#background img:nth-child(3)");

    rightBorderDeco.style.animation = "upper-slide-up 1.2s forwards";
    leftBorderDeco.style.animation = "lower-slide-down 1.2s forwards";

    const cardOne = document.getElementById("first-card");
    cardOne.style.animation = "slide-out 1.2s ease-in forwards";

    const cardTwo = document.getElementById("second-card");
    cardTwo.style.animation = "slide-out 1s ease-in forwards";

    const cardThree = document.getElementById("third-card");
    cardThree.style.animation = "slide-out 0.8s ease-in forwards";

    initializeButton.style.animation = "slide-out 0.8s ease-in forwards";
    initializeButton.style.cursor = "default";

    setTimeout(openLibrary, 1000); 
}   

function openLibrary() {

    // Removes all remaining nodes  

    const backChildNodes = Array.from(background.childNodes);
    backChildNodes.forEach((child) => {
        if (child !== background.lastElementChild)
            background.removeChild(child);
    });
    
    const frontChildNodes = Array.from(frontpage.childNodes);
    frontChildNodes.forEach((child) => {
        if (child !== frontpage.lastElementChild)
            frontpage.removeChild(child);
    });

    // Student Reading Background 
    
    const studentOneIllu = document.createElement("img");
    studentOneIllu.setAttribute("id", "illu-one"); 
    studentOneIllu.setAttribute("class", "illu");
    studentOneIllu.setAttribute("src", "images/Student-reading-a-book-V2.svg");
    
    background.appendChild(studentOneIllu); 
    background.style.height = "100%";
}

function addBook() {
    
    const dialog = document.createElement("dialog");
    dialog.setAttribute("id", "bookEdit");

    const closeButton = document.createElement("div");
    closeButton.setAttribute("id", "closeButton");
    closeButton.textContent = "X";

    const form = document.createElement("form"); 

    const nameInput = document.createElement("input");
    nameInput.setAttribute("class", "userInput");
    nameInput.setAttribute("id", "nameInput");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "nameInput"); 
    nameInput.setAttribute("placeholder", "Name");

    const authorInput = document.createElement("input");
    authorInput.setAttribute("class", "userInput");
    authorInput.setAttribute("id", "authorInput");
    authorInput.setAttribute("type", "text");
    authorInput.setAttribute("name", "authorInput"); 
    authorInput.setAttribute("placeholder", "Author");

    const pagesInput = document.createElement("input");
    pagesInput.setAttribute("class", "userInput");
    pagesInput.setAttribute("id", "pagesInput");
    pagesInput.setAttribute("type", "text");
    pagesInput.setAttribute("name", "pagesInput"); 
    pagesInput.setAttribute("placeholder", "Number of pages");

    const otherInput = document.createElement("textarea");
    otherInput.setAttribute("class", "userInput");
    otherInput.style.resize = "none";
    otherInput.setAttribute("id", "otherInput");
    otherInput.setAttribute("type", "text");
    otherInput.setAttribute("name", "otherInput"); 

    form.appendChild(nameInput);
    form.appendChild(authorInput);
    form.appendChild(pagesInput);
    form.appendChild(otherInput);

    const formButton = document.createElement("button");
    formButton.id = "saveButton";
    formButton.textContent = "Save";
    formButton.type = "submit";
    formButton.methodForm = "dialog";

    const delBookButton = document.createElement("button");
    delBookButton.setAttribute("id", "delBookButton");
    delBookButton.textContent = "Delete Book";
    
    const dialogButtons = document.createElement("div"); 
    dialogButtons.setAttribute("id", "dialogButtons"); 

    dialogButtons.appendChild(delBookButton);
    dialogButtons.appendChild(formButton);

    form.appendChild(dialogButtons);

    dialog.appendChild(closeButton);
    dialog.appendChild(form);

    frontpage.appendChild(dialog); 

    dialog.showModal();

    formButton.addEventListener("click", () => {
        dialog.remove();
    });
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();
    });

    window.addEventListener('keydown', (event) => {
        if (event.keyCode === 27) {
            event.preventDefault();
        }
    });

    closeButton.addEventListener("click", () => {
        dialog.remove();
    });
}

function removeBook(bookId) {}

function removeAllBooks() {}

function editBook(bookId) {}

function initializeGrid(gridNumber) {
    // Books Grid 
    const booksGrid = document.createElement("div"); 
    booksGrid.setAttribute("id", "grid");     
    
    for (i = 1; i <= 2; i++) {
        for (j = 1; j <= 4; j++) {
            const gridElement = document.createElement("div"); 
            gridElement.setAttribute("class", "gridItem");
            gridElement.setAttribute("id", `G${String(gridNumber).padStart(2, '0')}L${String(i).padStart(2, '0')}C${String(j).padStart(2, '0')}`);
            booksGrid.appendChild(gridElement);
        }
    }

    const addButton = document.createElement("button");
    addButton.setAttribute("id", "add-button");
    addButton.setAttribute("class", "hud");
    const addFigure = document.createElement("img");
    addFigure.setAttribute("src", "images/icons/book-plus.svg");
    addButton.appendChild(addFigure);
    
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", "delete-button");
    deleteButton.setAttribute("class", "hud");
    const removeFigure = document.createElement("img");
    removeFigure.setAttribute("src", "images/icons/delete.svg");
    deleteButton.appendChild(removeFigure);

    frontpage.appendChild(addButton);
    frontpage.appendChild(deleteButton); 

    frontpage.appendChild(booksGrid);    
}

// EventListener é adicionado somente uma vez.
initializeButton.addEventListener("click", () => {
    initialize();
    setTimeout(() => {
        initializeGrid(1);
        const plusButton = document.getElementById("add-button");
        const delButton = document.getElementById("delete-button");
        plusButton.addEventListener("click", () => {
            addBook();
        }); 
        
        delButton.addEventListener("click", () => {
            removeAllBooks();
        });
    }, 1000);
});
