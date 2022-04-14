
var gCtxG;
var gIdxImg = 1;
var keyWordsArr = [{word:'All IMG', size:15, id:1},{word:'funny', size:15, id:2},{word:'presidant', size:15, id:3},{word:'baby', size:15, id:4}, {word:'sleep', size:15, id:5},{word:'cute', size:15, id:6}, {word:'dog', size:15, id:7}, {word:'movie/TV', size:15, id:8}]
var gImgs = [{ id: 1, url: './img/meme-imgs (square)/1.jpg', keywords: ['All IMG','funny', 'presidant'] }, { id: 2, url: './img/meme-imgs (square)/2.jpg', keywords: ['All IMG','funny', 'dog', 'baby'] }
    , { id: 3, url: './img/meme-imgs (square)/3.jpg', keywords: ['All IMG','baby', 'sleep', 'dog'] }, { id: 4, url: './img/meme-imgs (square)/4.jpg', keywords: ['All IMG','funny', 'cat', 'sleep'] }
    , { id: 5, url: './img/meme-imgs (square)/5.jpg', keywords: ['All IMG','baby', 'cute'] }, { id: 6, url: './img/meme-imgs (square)/6.jpg', keywords: ['All IMG','funny'] }
    , { id: 7, url: './img/meme-imgs (square)/7.jpg', keywords: ['All IMG','funny', 'baby',] }, { id: 8, url: './img/meme-imgs (square)/8.jpg', keywords: ['All IMG','funny', 'movie/TV'] }
    , { id: 9, url: './img/meme-imgs (square)/9.jpg', keywords: ['All IMG','funny', 'movie/TV'] }, { id: 10, url: './img/meme-imgs (square)/10.jpg', keywords: ['All IMG','funny', 'presidant'] }
    , { id: 11, url: './img/meme-imgs (square)/11.jpg', keywords: ['All IMG','funny', 'cat'] }, { id: 12, url: './img/meme-imgs (square)/12.jpg', keywords: ['All IMG','funny', 'movie/TV'] }
    , { id: 13, url: './img/meme-imgs (square)/13.jpg', keywords: ['All IMG','funny', 'movie/TV'] }, { id: 14, url: './img/meme-imgs (square)/14.jpg', keywords: ['All IMG','funny', 'movie/TV'] }
    , { id: 15, url: './img/meme-imgs (square)/15.jpg', keywords: ['All IMG','funny', 'movie/TV'] }, { id: 16, url: './img/meme-imgs (square)/16.jpg', keywords: ['All IMG','funny', 'movie/TV'] }
    , { id: 17, url: './img/meme-imgs (square)/17.jpg', keywords: ['All IMG','funny', 'presidant'] }, { id: 18, url: './img/meme-imgs (square)/18.jpg', keywords: ['All IMG','funny', 'movie/TV'] }
];

function renderGallery() {
    elGrid = document.querySelector('.grid-container');
    var strHtml = '';
    gImgs.forEach(img => {
        strHtml += `<button class="gal-btn" onclick="onSetImg(this)" id="${img.id}"> <img src="${img.url}" class="gall-pic"> </button>`
        // var imgP = new Image();
        // imgP.src = img.url;
    })
    elGrid.innerHTML = strHtml;
}

function onSearchBy2(keyword) {
    elKWContain = document.querySelector('.key-words')
    var strHtml = '';
    keyWordsArr.forEach(key => {
        strHtml += `<button class="key-btn" value="${key.word}" id="${key.id}" onclick="renderBySearch(event)">${key.word}</button>`
    })
    elKWContain.style.display = 'block'
    elKWContain.innerHTML = strHtml
}

function renderBySearch(ev) {
    elBtn=document.getElementById(ev.target.id);
    console.log(elBtn);
    keyWordsArr[ev.target.id-1].size+=2;
    console.log( keyWordsArr[ev.target.id-1].size);
    elBtn.style.fontSize=`${ keyWordsArr[ev.target.id-1].size}px`
    keyWordsArr[ev.target.id]

    elBtn.style.fontSize='scale(1.2)';/////not good enoung
    elGrid = document.querySelector('.grid-container');
    var strHtml = '';
    gImgs.forEach(img => {
        img.keywords.forEach(keyword => {
            if (keyword.includes(ev.target.value)) {
                strHtml += `<button class="gal-btn" onclick="onSetImg(this)" id="${img.id}"> <img src="${img.url}" class="gall-pic"> </button>`
            }
        })
    })
    elGrid.innerHTML = strHtml;
}
