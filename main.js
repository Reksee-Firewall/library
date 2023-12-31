const initializeButton = document.getElementById("initialize");
const background = document.getElementById("background");
const frontpage = document.getElementById("frontpage");

const myLibrary = []; 

// Protótipos são utilizados para herança. A atribuição seria, ao invés disto, direta.
// Construtor.
function Book(name, author, numberOfPages, isRead, other, bookIdentifier) {
    this.name = name; 
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
    this.other = other;
    this.bookIdentifier = bookIdentifier;
    this.toString = function() {
        return(`[${this.name} by ${this.author}; ${this.numberOfPages}; isRead: ${this.isRead}]; bookIdentifier: ${bookIdentifier}`); 
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

function openDialog(book) {

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
    nameInput.setAttribute("maxlength", "32");

    const authorInput = document.createElement("input");
    authorInput.setAttribute("class", "userInput");
    authorInput.setAttribute("id", "authorInput");
    authorInput.setAttribute("type", "text");
    authorInput.setAttribute("name", "authorInput"); 
    authorInput.setAttribute("placeholder", "Author");
    authorInput.setAttribute("maxlength", "32");

    const pagesInput = document.createElement("input");
    pagesInput.setAttribute("class", "userInput");
    pagesInput.setAttribute("id", "pagesInput");
    pagesInput.setAttribute("type", "text");
    pagesInput.setAttribute("name", "pagesInput"); 
    pagesInput.setAttribute("placeholder", "Number of pages");
    pagesInput.setAttribute("maxlength", "32");

    pagesInput.addEventListener("keydown", (event) => {
        const key = event.key; 
        const numbers = "0123456789";
        if (key !== "Backspace" && key !== "Enter" && key !== "Tab") {
            if (!numbers.includes(key)) {
                event.preventDefault();
            }
        }
    }, false); 

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

    // Delete option should NOT be available when ADDING a NEW book.
    delBookButton.style.visibility = "hidden"; 

    const dialogButtons = document.createElement("div"); 
    dialogButtons.setAttribute("id", "dialogButtons"); 

    dialogButtons.appendChild(delBookButton);
    dialogButtons.appendChild(formButton);

    form.appendChild(dialogButtons);

    dialog.appendChild(closeButton);
    dialog.appendChild(form);

    frontpage.appendChild(dialog); 

    dialog.showModal();

    if (book) {
        nameInput.value = book.name;
        authorInput.value = book.author;
        pagesInput.value = book.numberOfPages;
        otherInput.value = book.other;
    }
}

function addBook(gridNumber, lastBook, addLocal = 0) {
    let currentLibrarySize = myLibrary.length;
    let isFormValid = false;

    // Find first empty box
    const grid = document.querySelector("#grid");
    const gridArray = Array.from(grid.childNodes);

    const firstWithoutChildren = gridArray.find((item) => {
        if (item.children.length === 0) {
            return item; 
        }
    });
    const indexOfFirstWithoutChildren = gridArray.indexOf(firstWithoutChildren);
    // <-- 

    const column = indexOfFirstWithoutChildren % 4; 
    const line = Math.trunc(indexOfFirstWithoutChildren / 4); 

    if ((currentLibrarySize) >= 7) {
        const plusButton = document.getElementById("add-button");
        if (!plusButton.classList.contains('whateverTurnRed')) {
            plusButton.style.backgroundColor = "red";
            setTimeout(() => {
                plusButton.style.backgroundColor = "white";
            }, 500); 
        }
        throw new Error("Grid has reached it's limit.");
    } else {
        if (addLocal === 0) 
            openDialog(lastBook);
        const form = document.querySelector("form");
        const dialog = document.querySelector("dialog");
        form.addEventListener("submit", (event) => {
            // Adiciona required a todos os elementos necessários que não tiverem sido preenchidos.
            const getInputs = Array.from(document.querySelectorAll(".userInput"));
            isFormValid = true; 
            getInputs.forEach((elem) => {
                if (elem.hasAttribute("placeholder") && !(elem.value)) {
                    elem.setAttribute("required", true);
                    isFormValid = false;
                }
            });
            
            event.preventDefault();

            let name, author='null', numberOfPages='null', isRead=false, other='null';

            if (isFormValid && !lastBook) {

                // Criação do Livro

                const bookIdentifier = `G${String(gridNumber).padStart(2, '0')}L${String(line).padStart(2, '0')}C${String(column).padStart(2, '0')}`;

                name = document.getElementById("nameInput").value;
                author = document.getElementById("authorInput").value;
                pages = document.getElementById("pagesInput").value;
                other = document.getElementById("otherInput").value;

                const newBook = new Book(name, author, pages, isRead, other, bookIdentifier);
                myLibrary.push(newBook); 

                // Upload em Browser
                localStorage.setItem(`localItemNumber${localStorage.length}`, newBook);
                // <--

                const bookBox = document.createElement("div");
                bookBox.setAttribute("class", "bookItem"); 
                bookBox.setAttribute("id", (Number(line) * 4) + Number(column)); 
                
                const gridItem = document.getElementById(`gridItemNumber${(Number(line) * 4) + Number(column)}`);

                gridItem.appendChild(bookBox);

                // <-- 

                // Book Configurations

                bookBox.addEventListener("click", () => {
                    addBook(0, newBook);
                    delBookButton.style.visibility = "visible"; 
                });

                // <--
                dialog.remove();
            }
            if (isFormValid && lastBook) {

                name = document.getElementById("nameInput").value;
                author = document.getElementById("authorInput").value;
                pages = document.getElementById("pagesInput").value;
                other = document.getElementById("otherInput").value;

                myLibrary.forEach((elem) => {
                    if (elem === lastBook) {
                        elem.name = name; 
                        elem.author = author; 
                        elem.numberOfPages = pages;
                        elem.other = other;
                    }
                });

                // Upload em Browser
                localStorage.setItem(`localItemNumber${myLibrary.indexOf(lastBook)}`, lastBook);
                // <--

                dialog.remove();
            }
        });
        window.addEventListener('keydown', (event) => {
            if (event.keyCode === 27) {
                event.preventDefault();
            }
        });
        const closeButton = document.querySelector("#closeButton");
        closeButton.addEventListener("click", () => {
            dialog.remove();
        });

        if (lastBook) {
            const delBookButton = document.querySelector("#delBookButton");
            delBookButton.addEventListener("click", () => {

                const index = myLibrary.indexOf(lastBook);

                myLibrary.forEach((book) => {
                    if (book === lastBook) {

                        /* O item é removido apenas quando o navegador é fechado ou 
                        quando o usuário limpa o armazenamento local. */

                        // localStorage.removeItem(`localItemNumber${index}`); 
                        
                        // How to solve? IDKY
                    }
                });

                const gridItem = document.querySelector(`#gridItemNumber${index}`);
                gridItem.innerHTML = '';
            });
        }
    }
}

function removeAllBooks() {

    const grid = document.getElementById("grid");

    myLibrary.splice(0, 7);

    (Array.from(grid.children)).forEach((elem) => {
        if (elem.hasChildNodes) {
            elem.innerHTML = '';
        }
    });    

    localStorage.clear();
}

function localBooksInitialize() {
    let size = localStorage.length;
    if (size > 0) {
        for(let i = 0; i < size; i++ ) {
            // myLibrary.push(localStorage.getItem(`item${i}`)); 
            // addBook(0, null, 1);
            // addBook(0, localStorage.getItem(`item${i}`));
            console.log(localStorage.key(i));
        }
        console.log(localStorage);
    }
}

function initializeGrid(gridNumber) {
    // Books Grid 
    const booksGrid = document.createElement("div"); 
    booksGrid.setAttribute("id", "grid");     
    
    for (i = 0; i < 2; i++) {
        for (j = 0; j < 4; j++) {
            const gridElement = document.createElement("div"); 
            gridElement.setAttribute("class", "gridItem");
            gridElement.setAttribute("id", `gridItemNumber${i * 4 + j}`);
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

    localBooksInitialize();
}

// EventListener é adicionado somente uma vez.
initializeButton.addEventListener("click", () => {
    initialize();
    setTimeout(() => {
        initializeGrid(1);
        const plusButton = document.getElementById("add-button");
        const delButton = document.getElementById("delete-button");
        plusButton.addEventListener("click", () => {
            addBook(0);
        }); 
        delButton.addEventListener("click", () => {
            removeAllBooks();
        });
    }, 1000);
});
