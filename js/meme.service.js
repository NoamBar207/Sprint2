var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
// var gImgs = [{id: 1, url: '/img/meme-imgs (square)/1.jpg', keywords: ['funny', 'cat']}];

var gMeme = {
    selectedImgId: 9,
    selectedLineIdx: 0,
    lines: [
        {
            pos: { posX: 250, posY: 50 },
            lineId: 0,
            txt: 'אני כשראיתי את שחף עם חולצה של הצהבת בשיעור',
            size: 20,
            align: 'center',
            color: 'blue',
            isDrag: false,
            sizeW: 0,
        },
        {
            pos: { posX: 250, posY: 450 },
            lineId: 1,
            txt: 'מכבי יש רק בחיפה!חחחחחחחח יגרמנים',
            size: 20,
            align: 'center',
            color: 'green',
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
    console.log(ev)
    gMeme.lines[gMeme.selectedLineIdx].color = ev.target.value
}

function incDecClick(ev) {
    gMeme.lines[gMeme.selectedLineIdx].size += 4 * ev.target.value;
}

function switchLine() {
    if (gMeme.lines.length - 1 > gMeme.selectedLineIdx) {
        gMeme.selectedLineIdx++;
    }
    else gMeme.selectedLineIdx = 0;
    // console.log(gMeme.selectedLineIdx)
}

function setImg(elBtn) {
    // console.log(elBtn)
    gMeme.selectedImgId = elBtn.id;
}

function textLRC(ev) {
    gMeme.lines[gMeme.selectedLineIdx].align = ev.target.value;
}

function addLine(ev) {
    var newLine = {
        pos: { posX: 250, posY: 250 },
        lineId: 0,
        txt: ev.target.value,
        size: 20,
        align: 'center',
        color: 'white',
        isDrag: false,
        sizeW: 0
    }
    gMeme.lines.push(newLine)
}

function deleteLine(ev) {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}



function isLineClicked(posClick) {
    for (var i = 0; i < gMeme.lines.length; i++) {
        const pos = gMeme.lines[i].pos
        const distance = Math.sqrt((pos.posX - posClick.x) ** 2 + (pos.posY - posClick.y) ** 2)
        if (distance <= gMeme.lines[i].sizeW / 2) {
            gMeme.selectedLineIdx = i
            return true
        }
    }
}

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
    // console.log(gMeme.lines[gMeme.selectedLineIdx].isDrag)
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.posX += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.posY += dy
}
// function textHittest(x,y,textIndex,txt){
//     return(x>=txt.x &&
//         x<=txt.x+txt.width &&
//         y>=txt.y-txt.height &&
//         y<=txt.y);
// }
