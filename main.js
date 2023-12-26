const initializeButton = document.getElementById("initialize");
const background = document.getElementById("background");
const frontpage = document.getElementById("frontpage");

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

    frontpage.appendChild(booksGrid);
}

initializeButton.addEventListener("click", () => {
    initialize();
    setTimeout(() => {
        initializeGrid(1);
    }, 1000);
});