import { getImgName, showKingMoves, showSoldierMoves, showCamelMoves, showElephantMoves, showQueenMoves, showHorseMoves } from './propertiesOfPieces.js'; //import all pieces moves showing functions

//sounds for each effects
const killSound = document.getElementById("killSound");
const moveSound = document.getElementById("moveSound");
const captureSound = document.getElementById("captureSound");

let turnOf = "w"; //white=>w  black=>b
addHighlightWhoseTurn(turnOf);
var killedByBlack = 0;
var killedByWhite = 0;
const eliminated = document
    .querySelector(".eliminated")
    .querySelectorAll(".pieces");
let eliminateboxWhite = eliminated[1];
let eliminateboxBlack = eliminated[0];





function clearAllMoves() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let cell = document.getElementById(i.toString() + j.toString());

            if (cell.classList.contains("highlighted_cell_filled")) {
                cell.classList.remove("highlighted_cell_filled");
            }
            if (cell.classList.contains("highlighted_cell_empty")) {
                cell.classList.remove("highlighted_cell_empty");
            }
        }
    }
}

function showOverlay(player) {
    var overlay = document.getElementById("overlay");
    var overlayMessage = document.getElementById("overlay-message");

    overlayMessage.textContent = `🏆🏆 Winner : ${player == "b" ? "Black" : "White"
        } 🏆🏆`;
    overlay.style.display = "block";

    setTimeout(function () {
        overlay.style.opacity = "1";
    }, 10);
}







function killing(cellid) {
    let cell = document.getElementById(cellid);
    let Imgcell = cell.querySelector("img");
    let Imgname = Imgcell.getAttribute("src").substring(7, 9);

    let imgDiv = document.createElement("div");
    if (Imgname[0] == "b") {
        imgDiv.appendChild(Imgcell);
        eliminateboxWhite.appendChild(imgDiv);
        killedByWhite++;
    } else {
        imgDiv.appendChild(Imgcell);
        eliminateboxBlack.appendChild(imgDiv);
        killedByBlack++;
    }

    if (Imgname[1] == "k" || killedByBlack == 16 || killedByWhite == 16) {
        //king is eliminated or all pieces are eliminated
        setTimeout(() => {
            //show who won the game
            showOverlay(Imgname[0] == "b" ? "w" : "b"); //because last killed in lose the game
        }, 1000);

        console.log("GAME OVER ");
        setTimeout(() => {
            let result = confirm("Are you Want to Play Again the Game ?? ");

            if (result) {
                location.reload(); //restart the game
            } else {
                window.history.back(); //exit the game
            }
        }, 2000);
    }
}

function move(from, to) {
    //from and to giving table cellid and we moving it

    let fromcell = document.getElementById(from);
    let tocell = document.getElementById(to);

    // let fromcellImg=fromcell.querySelector("img");

    if (tocell.childElementCount == 0) {
        tocell.innerHTML = fromcell.innerHTML;
        fromcell.innerHTML = "";
        moveSound.play();

    } else {
        killSound.play();

        killing(to);

        tocell.innerHTML = fromcell.innerHTML;

        fromcell.innerHTML = "";
    }

    //if soldier reaches the end of opposites town than give it a new pieces as exchange
    tocell = document.getElementById(to);

    const tocellImgName = getImgName(to);
    if ((to[0] == "7" || to[0] == "0") && tocellImgName[1] == "s") {

        giveChangePiece(to, tocellImgName[0]);
    }
}

function moveElimateBoxTocell(from, to) {
    let tocell = document.getElementById(to);

    tocell.innerHTML = from.innerHTML;

    from.innerHTML = "";
}








function removeOtherAnimations(player) {
    let divs;
    if (player == "w") {
        //if player is white then it can get eliminated pieces by white (black pieces)....

        divs = eliminateboxBlack.childNodes;
    } else {
        divs = eliminateboxWhite.childNodes;
    }

    for (let div of divs) {
        let img = div.childNodes[0];

        if (img) {
            img.classList.remove("border-animation");
        }
    }
}





function giveChangePiece(cellid, player) {
    let imgs;
    if (player == "w") {
        imgs = eliminateboxBlack.childNodes;
        killedByWhite--;
    } else {
        imgs = eliminateboxWhite.childNodes;
        killedByBlack--;
    }

    for (let imgDiv of imgs) {
        let img = imgDiv.firstChild;

        let Imgname = img.getAttribute("src").substring(7, 9)[1];
        if (Imgname != "s") {
            //because soldier can't respawn (it's already soldier)
            img.classList.add("border-animation");
            img.addEventListener("click", () => {
                img.classList.remove("border-animation");

                killSound.play(); //it's kill sound but suit on it

                moveElimateBoxTocell(imgDiv, cellid);
                removeOtherAnimations(player);
            });
        }
    }
}





function addHighlightWhoseTurn(player) {
    //function hightlight text of player whose turn is
    let text;
    if (player == "w") {
        text = document.getElementById("whitePlayerText");
    } else {
        text = document.getElementById("blackPlayerText");
    }
    text.classList.add("border-animation");
}
function removeHighlightWhoseTurn(player) {
    let text;
    if (player == "w") {
        text = document.getElementById("whitePlayerText");
    } else {
        text = document.getElementById("blackPlayerText");
    }
    text.classList.remove("border-animation");
}






let lastClickedCell = null;

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        let cellid = i.toString() + j.toString();
        let cell = document.getElementById(cellid);

        cell.addEventListener("click", () => {
            let Imgcell = cell.querySelector("img");
            if (
                cell.classList.contains("highlighted_cell_filled") ||
                cell.classList.contains("highlighted_cell_empty")
            ) {
                move(lastClickedCell, cellid);
                clearAllMoves();
                removeHighlightWhoseTurn(turnOf);
                turnOf = turnOf == "w" ? "b" : "w";
                addHighlightWhoseTurn(turnOf);
            } else if (Imgcell) {
                let Imgname = Imgcell.getAttribute("src").substring(7, 9);
                clearAllMoves();

                if (Imgname[0] == turnOf) {
                    // if clicked cell is a cell whose turn is so only show moves
                    switch (Imgname[1]) {
                        case "s":
                            showSoldierMoves(cellid);
                            break;
                        case "k":
                            showKingMoves(cellid);
                            break;
                        case "q":
                            showQueenMoves(cellid);
                            break;
                        case "c":
                            showCamelMoves(cellid);
                            break;
                        case "e":
                            showElephantMoves(cellid);
                            break;
                        case "h":
                            showHorseMoves(cellid);
                            break;
                    }
                    lastClickedCell = cellid;
                }
            }
        });
    }
}
