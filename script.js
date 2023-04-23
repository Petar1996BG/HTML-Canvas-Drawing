let x = 0
let y = 0
let isDrawing = false
const cnv = document.getElementById("canvas")
const ctx = cnv.getContext("2d")

cnv.addEventListener("mousedown", (e) => {
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true
})

cnv.addEventListener("mousemove", (e) => {
    if (isDrawing === true) {
        drawLine(x, y, e.offsetX, e.offsetY)
        x = e.offsetX;
        y = e.offsetY
    }
})

cnv.addEventListener("mouseup", (e) => {
    if (isDrawing === true) {
        drawLine(x, y, e.offsetX, e.offsetY)
        x = 0;
        y = 0;
        isDrawing = false
    }
})

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.strokeStyle = "black"
    ctx.lineWidth = 1
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.closePath()
}

let currCanvas = document.getElementById("canvas");

function clearCanvas() {
    if (confirm("Are you sure you want to delete your painting ?") == true) {
        location.reload();
        localStorage.clear()
    }
}

function saveCurrentDraw() {
    localStorage.setItem("canvas", currCanvas.toDataURL())
}

let dataURL = localStorage.getItem("canvas");
let img = new Image;
img.src = dataURL;
img.onload = function () {
    ctx.drawImage(img, 0, 0);
};

document.getElementById("btnDownload").addEventListener("click", (e) => {
    console.log(currCanvas.toDataURL());
    const link = document.createElement('a');
    link.download = 'download.png';
    link.href = currCanvas.toDataURL();
    link.click();
    link.delete;
})