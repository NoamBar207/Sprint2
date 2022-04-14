
var gElCanvas;
var gCtx;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']


function init() {
    gElCanvas = document.getElementById('canvas');
    gCtx = gElCanvas.getContext('2d');
    addListeners();
    renderMeme();
    renderGallery();
}


function renderMeme() {
    const cMeme = getMeme();
    var img = new Image();
    img.src = getImg();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        cMeme.lines.forEach(line => {
            renderLine(line);
        })
    };
}

function renderLine(line) {
    gCtx.beginPath();

    gCtx.font = `${line.size}` + "px impact";
    gCtx.globalAlpha = 0;
    var textWidth = gCtx.measureText(line.txt).width
    gCtx.fillRect(line.pos.posX - textWidth / 2, line.pos.posY - 10, textWidth, line.pos.posY);
    line.sizeW=textWidth;
    gCtx.globalAlpha = 1;

    gCtx.textBaseline = "top";
    gCtx.textAlign = line.align;
    gCtx.strokeStyle = line.color;
    gCtx.fillStyle = line.color;
    gCtx.fillText(line.txt, line.pos.posX, line.pos.posY)
    gCtx.strokeStyle = 'black';
    gCtx.strokeText(line.txt, line.pos.posX, line.pos.posY);
    
    gCtx.stroke();
}

function onSetLineTxt(ev) {
    setLineTxt(ev);
    renderMeme();
}


function onSetColor(ev) {
    ev.preventDefault();
    setColor(ev);
    renderMeme();
}

function onIncDecClick(ev) {
    incDecClick(ev);
    renderMeme();
}

function onSwitchLine(ev) {
    switchLine();
    renderMeme();
}

function onSetImg(elBtn) {
    setImg(elBtn);
    var elCont = document.querySelector('.can-edi')
    elCont.style.display = 'block'
    elCont = document.querySelector('.gal-container')
    elCont.style.display = 'none'
    elCont = document.querySelector('.key-words')
    elCont.style.display = 'none'
    renderMeme();
}

function onGallClick() {
    var elCont = document.querySelector('.can-edi')
    elCont.style.display = 'none'
    elCont = document.querySelector('.gal-container')
    elCont.style.display = 'block'
}

function onTextLRC(ev) {
    // console.log(ev.target.value)
    textLRC(ev);
    renderMeme();
}

function onAddLine(ev) {
    addLine(ev);
    renderMeme();
}

function onDeleteLine(ev) {
    deleteLine();
    renderMeme();
}

function onDownload(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'water.jpg'
}


function onDown(ev) {
    const posClick=getEvPos(ev);
    if(!isLineClicked(posClick))return
    setLineDrag(true);
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const cMeme = getMeme();
    if (!cMeme.lines[cMeme.selectedLineIdx].isDrag) return;
    const pos = getEvPos(ev);
    const dx = pos.x - cMeme.lines[cMeme.selectedLineIdx].pos.posX;
    const dy = pos.y - cMeme.lines[cMeme.selectedLineIdx].pos.posY;
    moveLine(dx, dy);
    renderMeme();
}

function onUp() {
    setLineDrag(false);
    document.body.style.cursor = 'grab';
    // setCircleDrag(false)
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    // console.log(pos)
    return pos
}





function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function resizeCanvas() {
    const elContainer = document.querySelector('.main-grid')
    console.log(elContainer.offsetHeight)
    gElCanvas.width = elContainer.offsetWidth/2
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}


