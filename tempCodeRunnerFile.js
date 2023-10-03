function getImgName(cellid) {
    let cell = document.getElementById(cellid);
    if (cell == null) return null;
    let Imgcell = cell.querySelector("img");
    if (Imgcell == null) return null;
    let Imgname = Imgcell.getAttribute("src");
    console.log(Imgname);
    return Imgname;
}
getImgName("01"); 