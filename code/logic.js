
var killedByBlack=0;
var killedByWhite=0;
const eliminated=document.querySelector(".eliminated").querySelectorAll(".pieces");
let eliminateboxWhite=eliminated[1];
let eliminateboxBlack=eliminated[0];

function killing(cellid){
    let cell=document.getElementById(cellid);
    let Imgcell=cell.querySelector("img");
    let Imgname=Imgcell.getAttribute("src")
    if(Imgname[0]=='b'){

        killedByWhite++;
        eliminateboxWhite.appendChild(Imgcell);

    }
    else{
        killedByBlack++;
        eliminateboxBlack.appendChild(Imgcell);
    }
    console.log(Imgname);
}


function move(from, to) {//from and to giving table cellid and we moving it

    let fromcell=document.getElementById(from);
    let tocell=document.getElementById(to);

    let fromcellImg=fromcell.querySelector("img");

    if(tocell.childElementCount == 0) {
        tocell.innerHTML=fromcell.innerHTML;
        fromcell.innerHTML="";
        
    }
    else{
        killing(tocell);
        tocell.innerHTML=fromcell.innerHTML;
        fromcell.innerHTML="";

    }

    

}
// setTimeout(() => {
//     move("01","21");
// }, 2000);

