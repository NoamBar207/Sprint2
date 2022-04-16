
var gCtxG;
var gIdxImg = 1;
var keyWordsArr = [{word:'All IMG', size:15, id:1},{word:'Funny', size:15, id:2},{word:'Presidant', size:15, id:3},{word:'Baby', size:15, id:4}, {word:'Sleep', size:15, id:5},{word:'Cute', size:15, id:6}, {word:'Dog', size:15, id:7}, {word:'Movie/TV', size:15, id:8}]
var gImgs = [{ id: 1, url: './img/meme-imgs (square)/1.jpg', keywords: ['All IMG','Funny', 'Presidant'] }, { id: 2, url: './img/meme-imgs (square)/2.jpg', keywords: ['All IMG','Funny', 'Dog', 'Baby'] }
    , { id: 3, url: './img/meme-imgs (square)/3.jpg', keywords: ['All IMG','Baby', 'Sleep', 'Dog'] }, { id: 4, url: './img/meme-imgs (square)/4.jpg', keywords: ['All IMG','Funny', 'Cat', 'Sleep'] }
    , { id: 5, url: './img/meme-imgs (square)/5.jpg', keywords: ['All IMG','Baby', 'Cute'] }, { id: 6, url: './img/meme-imgs (square)/6.jpg', keywords: ['All IMG','Funny'] }
    , { id: 7, url: './img/meme-imgs (square)/7.jpg', keywords: ['All IMG','Funny', 'Baby',] }, { id: 8, url: './img/meme-imgs (square)/8.jpg', keywords: ['All IMG','Funny', 'Movie/TV'] }
    , { id: 9, url: './img/meme-imgs (square)/9.jpg', keywords: ['All IMG','Funny', 'Movie/TV'] }, { id: 10, url: './img/meme-imgs (square)/10.jpg', keywords: ['All IMG','Funny', 'Presidant'] }
    , { id: 11, url: './img/meme-imgs (square)/11.jpg', keywords: ['All IMG','Funny', 'Cat'] }, { id: 12, url: './img/meme-imgs (square)/12.jpg', keywords: ['All IMG','Funny', 'Movie/TV'] }
    , { id: 13, url: './img/meme-imgs (square)/13.jpg', keywords: ['All IMG','Funny', 'Movie/TV'] }, { id: 14, url: './img/meme-imgs (square)/14.jpg', keywords: ['All IMG','Funny', 'Movie/TV'] }
    , { id: 15, url: './img/meme-imgs (square)/15.jpg', keywords: ['All IMG','Funny', 'Movie/TV'] }, { id: 16, url: './img/meme-imgs (square)/16.jpg', keywords: ['All IMG','Funny', 'Movie/TV'] }
    , { id: 17, url: './img/meme-imgs (square)/17.jpg', keywords: ['All IMG','Funny', 'Presidant'] }, { id: 18, url: './img/meme-imgs (square)/18.jpg', keywords: ['All IMG','Funny', 'Movie/TV'] }
];

function renderGallery() {
    elGrid = document.querySelector('.grid-container');
    var strHtml = '';
    gImgs.forEach(img => {
        strHtml += `<button class="gal-btn" onclick="onSetImg(this)" id="${img.id}"> <img src="${img.url}" class="gall-pic"> </button>`
    })
    elGrid.innerHTML = strHtml;
}

function onSearchBy2() {
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
    if(keyWordsArr[ev.target.id-1].size<37) keyWordsArr[ev.target.id-1].size+=1;
    elBtn.style.fontSize=`${ keyWordsArr[ev.target.id-1].size}px`
    keyWordsArr[ev.target.id]

    elGrid = document.querySelector('.grid-container');
    renderBySearch2(ev.target.value);
}

function renderBySearch2(val){
    elGrid = document.querySelector('.grid-container');
    var strHtml = '';
    gImgs.forEach(img => {
        img.keywords.forEach(keyword => {
            if (keyword.includes(val)) {
                strHtml += `<button class="gal-btn" onclick="onSetImg(this)" id="${img.id}"> <img src="${img.url}" class="gall-pic"> </button>`
            }
        })
    })
    elGrid.innerHTML = strHtml;
    if(val==='') renderGallery();
}