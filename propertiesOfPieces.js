


export function getImgName(cellid) {
    let cell = document.getElementById(cellid);
    if (cell == null) return null;
    let Imgcell = cell.querySelector("img");
    if (Imgcell == null) return null;
    let Imgname = Imgcell.getAttribute("src");

    return Imgname.substring(7, 9);
}


export function highlightPosition(cellid, nextcellid) {
    let cell = document.getElementById(cellid);
    let Imgcell = cell.querySelector("img");
    let Imgname = Imgcell.getAttribute("src").substring(7, 9);

    let nextcell = document.getElementById(nextcellid);

    if (nextcell.childElementCount == 0) {
        nextcell.classList.add("highlighted_cell_empty");
    } else {
        let Imgcellnext = nextcell.querySelector("img");
        let Imgnamenext = Imgcellnext.getAttribute("src").substring(7, 9);

        if (Imgname[0] != Imgnamenext[0]) {
            if (Imgname[1] != "s") {
                nextcell.classList.add("highlighted_cell_filled");
            } else {
                //soldiers can kill diaogonal but not step up positions that's why
                if (cellid[1] != nextcellid[1]) {
                    nextcell.classList.add("highlighted_cell_filled");
                }
            }
        }

        return -1;
        //indiacte that it's same color piece on that position
    }
}


export function showKingMoves(curPosition) {
    let cell = document.getElementById(curPosition);
    let Imgcell = cell.querySelector("img");
    let Imgname = Imgcell.getAttribute("src").substring(7, 9);

    const positions = [
        [0, 1],
        [1, 0],
        [-1, 0],
        [0, -1],
        [1, 1],
        [-1, -1],
        [-1, 1],
        [1, -1],
    ];

    for (let i of positions) {
        let curr = i[0] + parseInt(curPosition[0]);
        let curc = i[1] + parseInt(curPosition[1]);

        if (curr >= 0 && curr < 8 && curc < 8 && curc >= 0) {
            let posString = curr.toString() + curc.toString();

            highlightPosition(curPosition, posString);
        }
    }
}

export function showSoldierMoves(curPosition) {
    let cell = document.getElementById(curPosition);
    let Imgcell = cell.querySelector("img");
    let Imgname = Imgcell.getAttribute("src").substring(7, 9);

    let positions = [];
    let curr = parseInt(curPosition[0]);
    let curc = parseInt(curPosition[1]);
    if (Imgname[0] == "b") {
        positions.push([curr + 1, curc]);
        if (!getImgName((curr + 1).toString() + curc.toString()) && (curr == 1)) {
            positions.push([curr + 2, curc]);
        }

        if (getImgName((curr + 1).toString() + (curc + 1).toString())) {
            if (
                Imgname[0] !=
                getImgName((curr + 1).toString() + (curc + 1).toString())[0]
            ) {
                positions.push([curr + 1, curc + 1]);
            }
        }

        if (getImgName((curr + 1).toString() + (curc - 1).toString())) {
            if (
                Imgname[0] !=
                getImgName((curr + 1).toString() + (curc - 1).toString())[0]
            ) {
                positions.push([curr + 1, curc - 1]);
            }
        }
    } else {
        positions.push([curr - 1, curc]);
        if (!getImgName((curr - 1).toString() + curc.toString()) && (curr == 6)) {
            positions.push([curr - 2, curc]);
        }

        if (getImgName((curr - 1).toString() + (curc + 1).toString())) {
            if (
                Imgname[0] !=
                getImgName((curr - 1).toString() + (curc + 1).toString())[0]
            ) {
                positions.push([curr - 1, curc + 1]);
            }
        }

        if (getImgName((curr - 1).toString() + (curc - 1).toString())) {
            if (
                Imgname[0] !=
                getImgName((curr - 1).toString() + (curc - 1).toString())[0]
            ) {
                positions.push([curr - 1, curc - 1]);
            }
        }
    }

    for (let i of positions) {
        let drow = i[0];
        let dcol = i[1];
        if (drow >= 0 && drow < 8 && drow < 8 && drow >= 0) {
            let posString = drow.toString() + dcol.toString();

            highlightPosition(curPosition, posString);
        }
    }
}


export function showCamelMoves(curPosition) {
    let cell = document.getElementById(curPosition);
    let Imgcell = cell.querySelector("img");

    let Imgname = Imgcell.getAttribute("src").substring(7, 9);

    let positions = [];
    let curr = parseInt(curPosition[0]);
    let curc = parseInt(curPosition[1]);

    let temp = [];

    let i = 1,
        j = 1;
    while (i + curr < 8 && j + curc < 8) {
        temp.push([curr + i, curc + j]);
        i++;
        j++;
    }
    positions.push(temp);
    temp = [];
    (i = 1), (j = 1);
    while (i + curr < 8 && curc - j >= 0) {
        temp.push([curr + i, curc - j]);
        i++;
        j++;
    }
    positions.push(temp);
    temp = [];
    (i = 1), (j = 1);
    while (curr - i >= 0 && curc - j >= 0) {
        temp.push([curr - i, curc - j]);
        i++;
        j++;
    }
    positions.push(temp);
    temp = [];
    (i = 1), (j = 1);
    while (curr - i >= 0 && j + curc < 8) {
        temp.push([curr - i, curc + j]);
        i++;
        j++;
    }
    positions.push(temp);
    temp = [];

    for (let i of positions) {

        for (let j of i) {
            let drow = j[0];
            let dcol = j[1];
            if (drow >= 0 && drow < 8 && drow < 8 && drow >= 0) {
                let posString = drow.toString() + dcol.toString();

                if (highlightPosition(curPosition, posString) == -1) {
                    break;
                }
            }
        }
    }
}



export function showElephantMoves(curPosition) {
    let cell = document.getElementById(curPosition);
    let Imgcell = cell.querySelector("img");
    let Imgname = Imgcell.getAttribute("src").substring(7, 9);

    let positions = [];
    let curr = parseInt(curPosition[0]);
    let curc = parseInt(curPosition[1]);

    let temp = [];

    let i = 1,
        j = 1;
    while (i + curr < 8 && curc < 8) {
        temp.push([curr + i, curc]);
        i++;
        j++;
    }
    positions.push(temp);
    temp = [];
    (i = 1), (j = 1);
    while (curr < 8 && curc - j >= 0) {
        temp.push([curr, curc - j]);
        i++;
        j++;
    }
    positions.push(temp);
    temp = [];
    (i = 1), (j = 1);
    while (curr - i >= 0 && curc >= 0) {
        temp.push([curr - i, curc]);
        i++;
        j++;
    }
    positions.push(temp);
    temp = [];
    (i = 1), (j = 1);
    while (curr >= 0 && j + curc < 8) {
        temp.push([curr, curc + j]);
        i++;
        j++;
    }
    positions.push(temp);
    temp = [];

    for (let i of positions) {


        for (let j of i) {
            let drow = j[0];
            let dcol = j[1];
            if (drow >= 0 && drow < 8 && drow < 8 && drow >= 0) {
                let posString = drow.toString() + dcol.toString();

                if (highlightPosition(curPosition, posString) == -1) {
                    break;
                }
            }
        }
    }
}

export function showQueenMoves(curPosition) {
    showCamelMoves(curPosition);
    showElephantMoves(curPosition);
}

export function showHorseMoves(curPosition) {
    let cell = document.getElementById(curPosition);
    let Imgcell = cell.querySelector("img");
    let Imgname = Imgcell.getAttribute("src").substring(7, 9);

    let positions = [
        [2, 1],
        [2, -1],
        [-2, 1],
        [-2, -1],
        [1, -2],
        [-1, -2],
        [1, 2],
        [-1, 2],
    ];
    let curr = parseInt(curPosition[0]);
    let curc = parseInt(curPosition[1]);

    for (let i of positions) {
        let curr = i[0] + parseInt(curPosition[0]);
        let curc = i[1] + parseInt(curPosition[1]);

        if (curr >= 0 && curr < 8 && curc < 8 && curc >= 0) {
            let posString = curr.toString() + curc.toString();

            highlightPosition(curPosition, posString);
        }
    }
}

