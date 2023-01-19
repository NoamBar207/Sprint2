var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gMeme = {
    selectedImgId: 9,
    selectedLineIdx: 0,
    lines: [
        {
            pos: { posX: 250, posY: 50 },
            lineId: 0,
            txt: 'ADD TEXT HERE',
            size: 30,
            align: 'center',
            color: 'white',
            isDrag: false,
            sizeW: 0,
        },
        {
            pos: { posX: 300, posY: 350 },
            lineId: 1,
            txt: 'YOU CAN ALSO ADD LINES AND CHANGE COLORS',
            size: 30,
            align: 'center',
            color: 'green',
            sizeW: 0,
            isDrag: false,
        },
        {
            pos: { posX: 250, posY: 200 },
            lineId: 2,
            txt: 'OR MOVE LINES USING DRAG AND DROP',
            size: 30,
            align: 'center',
            color: 'red',
            sizeW: 0,
            isDrag: false,
        }
    ]
}

function getMeme() {
    return gMeme;
}

function getImg() {
    return gImgs[gMeme.selectedImgId - 1].url
}

function setLineTxt(ev) {
    gMeme.lines[gMeme.selectedLineIdx].txt = ev.target.value
}

function setColor(ev) {
    gMeme.lines[gMeme.selectedLineIdx].color = ev.target.value
}

function incDecClick(ev) {
    gMeme.lines[gMeme.selectedLineIdx].size += 4 * ev.target.value;
}

function switchLine() {
    if (gMeme.lines.length - 1 > gMeme.selectedLineIdx)gMeme.selectedLineIdx++;
    else gMeme.selectedLineIdx = 0;
}

function setImg(elBtn) {
    gMeme.selectedImgId = elBtn.id;
}

function textLRC(str) {
    gMeme.lines[gMeme.selectedLineIdx].align = str;
}

function addLine(str) {
    var newLine = {
        pos: { posX: 250, posY: 250 },
        lineId: gMeme.lines.length,
        txt: (!str) ? "New Line" : str,
        size: (!str) ? 20 : 40,
        align: 'center',
        color: 'white',
        isDrag: false,
        sizeW: 0
    }
    gMeme.selectedLineIdx = gMeme.lines.length;
    gMeme.lines.push(newLine);
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    for(var i=gMeme.selectedLineIdx;i<gMeme.lines.length;i++){
        gMeme.lines[i].lineId--;
    }
}

function removeLetter() {
    let currLine = gMeme.selectedLineIdx
    gKeyHistory = gKeyHistory.slice(0, -1);
    gMeme.lines[currLine].txt = gKeyHistory;
    renderMeme();
}

function addLetter(gKeyHistory){
    let currLine = gMeme.selectedLineIdx;
    gMeme.lines[currLine].txt = gKeyHistory;
}

function downloadDeselectL(val) {
    gMeme.selectedLineIdx = val;
}

function isLineClicked(posClick) {
    for (var i = 0; i < gMeme.lines.length; i++) {
        const pos = gMeme.lines[i].pos
        if (posClick.y - pos.posY > 30 || pos.posY - posClick.y > 30) continue
        const distance = Math.sqrt((pos.posX - posClick.x) ** 2 + (pos.posY - posClick.y) ** 2)
        if (distance <= gMeme.lines[i].sizeW / 2) {
            gMeme.selectedLineIdx = i
            return true
        }
    }
}

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.posX += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.posY += dy
}
