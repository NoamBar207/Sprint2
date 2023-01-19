
var gElCanvas;
var gCtx;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
let gImgUser
let gKeyHistory = "";

function init() {
    gElCanvas = document.getElementById('canvas');
    gCtx = gElCanvas.getContext('2d');
    addListeners();
    resizeCanvas();
    renderMeme();
    renderGallery();
}

function renderMeme() {
    const cMeme = getMeme();
    var img = new Image();
    img.src = getImg();
    img.onload = () => {
        gCtx.drawImage(gImgUser ? gImgUser : img, 0, 0, gElCanvas.width, gElCanvas.height);
        cMeme.lines.forEach(line => {
            renderLine(line);
        })
    };
}

function renderLine(line) {
    gCtx.beginPath();

    gCtx.font = `${line.size}` + "px impact";
    var textWidth = gCtx.measureText(line.txt).width
    if (line.lineId === gMeme.selectedLineIdx) {
        if (line.align === 'center') gCtx.strokeRect(line.pos.posX - textWidth / 2, line.pos.posY - 10, textWidth, line.size + 20);
        else if (line.align === 'left') gCtx.strokeRect(line.pos.posX, line.pos.posY - 10, textWidth, line.size + 20);
        else gCtx.strokeRect(line.pos.posX - textWidth, line.pos.posY - 10, textWidth, line.size + 20);
    }
    line.sizeW = textWidth;

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
    document.querySelector('.palette').style.color = ev.target.value
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
    elCont = document.querySelector('.about-container')
    elCont.style.display = 'none'
    elCont = document.querySelector('.gal-container')
    elCont.style.display = 'block'
}

function onAboutClick() {
    var elCont = document.querySelector('.can-edi')
    elCont.style.display = 'none'
    elCont = document.querySelector('.gal-container')
    elCont.style.display = 'none'
    elCont = document.querySelector('.key-words')
    elCont.style.display = 'none'
    elCont = document.querySelector('.about-container')
    elCont.style.display = 'block'
}

function onTextLRC(str) {
    textLRC(str);
    renderMeme();
}


function onAddLetter(letter) {
    const cMeme = getMeme();
    gKeyHistory = cMeme.lines[cMeme.selectedLineIdx].txt
    gKeyHistory += letter;
    addLetter(gKeyHistory);
    renderMeme();
}

function keyUpHandler(ev) {
    var elCheack=document.querySelector('.can-edi')
    if(elCheack.style.display === 'none') return
    let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZץםןךףאבגדהוזחטיכלמנסעפצקרשת";
    let key = ev.key;
    console.log(key)
    if (key === 'Backspace') {
        onAddLetter('');
        removeLetter();
        return
    }
    if (key === ' ') {
        var letter=' ';
        onAddLetter(letter);
        return
    }
    for(var i=0;i<letters.length;i++){
        if (key === letters[i]) {
            let letter = letters.substring(i, i+1);
            onAddLetter(letter);
            break;
        }
    }  
}

function onAddLine() {
    addLine();
    renderMeme();
}

function onAddEmoji(ev) {
    addLine(ev.target.innerText);
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

function clearCanvas(val) {
    downloadDeselectL(val);
    renderMeme();
}

function restoreCanvas(val) {
    downloadDeselectL(val);
    renderMeme();
}

function onDown(ev) {
    const posClick = getEvPos(ev);
    if (!isLineClicked(posClick)) return
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
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    console.log(ev.type)
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}

function resizeCanvas() {
    let targetW = (window.innerWidth < 980) ? window.innerWidth * 0.6 : window.innerWidth * 0.4
    let width = Math.max(270, targetW)
    gElCanvas.width = width
    gElCanvas.height = gElCanvas.width;
}

//Listers
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function addMouseListeners() {
    window.addEventListener("keyup", keyUpHandler, true);
    gElCanvas.addEventListener('dblclick', isLineClicked);
    gElCanvas.addEventListener('mousemove', onMove);
    gElCanvas.addEventListener('mousedown', onDown);
    gElCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove);
    gElCanvas.addEventListener('touchend', onUp);
    gElCanvas.addEventListener('touchstart', onDown);
}

//UpLoad
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()

    reader.onload = (event) => {
        console.log('onload');
        var img = new Image()
        // Render on canvas
        img.src = event.target.result
        console.log(img)
        img.onload = onImageReady.bind(null, img)
    }
    console.log('after');
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    gImgUser = img;
    renderMeme();
}







