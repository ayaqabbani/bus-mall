'use strict';
const products = [
'bag',
'banana',
'bathroom',
'boots',
'breakfast',
'bubblegum',
'chair',
'cthulhu',
'dog-duck',
'dragon',
'pen',
'pet-sweep',
'scissors',
'shark',
'sweep',
'tauntaun',
'unicorn',
'usb',
'water-can',
'wine-glass',
];

const imageSection = document.getElementById('images');
const leftImage = document.getElementById('leftImage');
const centerImage = document.getElementById('centerImage');
const rightImage = document.getElementById('rightImage');
let counter = 0;

function Shop(name, imgExt) {
this.name = name;
this.views = 0;
this.votes = 0;
this.path = `./img/${name}.${imgExt}`;

}




let shopArray = [];

function doRender() {
for (let i = 0; i < products.length; i++) {
    let productName = products[i];
    let path;
    if (products[i] === 'sweep') {
        path = 'png'
    } else if (products[i] === 'usb') {
        path = 'gif'
    }
    else {
        path = 'jpg'
    }
    let shop = new Shop(productName, path);
    shopArray[i] = shop;
}
}

doRender();

function randomNumber(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min
}
let viewsList = [];
let lastImg = [" ", " ", " "];
function constructProductImage(image1, image2, image3) {
let index1 = randomNumber(0, shopArray.length - 1);
let index2 = randomNumber(0, shopArray.length - 1);
let index3 = randomNumber(0, shopArray.length - 1);

let y = 0;
while (y < 1) {
    if (lastImg.includes(shopArray[index1].name)) {
        index1 = randomNumber(0, shopArray.length - 1);
    } else {
        shopArray[index1].views++;
        lastImg[0] = shopArray[index1].name;
        image1.setAttribute('src', shopArray[index1].path);
        image1.setAttribute('title', shopArray[index1].name);
        y = 1;
    }
}


let x = 0;

while (x < 1) {
    if (lastImg.includes(shopArray[index2].name) || index2 === index1) {
        index2 = randomNumber(0, shopArray.length - 1);
    } else {
        shopArray[index2].views++;
        lastImg[1] = shopArray[index2].name;
        image2.setAttribute('src', shopArray[index2].path);
        image2.setAttribute('title', shopArray[index2].name);
        x = 1;
    }
}

let z = 0;

while (z < 1) {
    if (lastImg.includes(shopArray[index3].name) || index3 === index2 || index3 === index1) {
        index3 = randomNumber(0, shopArray.length - 1);
    } else {
        shopArray[index3].views++;
        lastImg[2] = shopArray[index3].name;
        image3.setAttribute('src', shopArray[index3].path);
        image3.setAttribute('title', shopArray[index3].name);
        z = 1;
    }
}
}



let resultSection = document.getElementById('aya');

function showResult() {
let list = document.createElement('ul');
for (let i = 0; i < shopArray.length; i++) {
    let li = document.createElement('li');
    let shop = shopArray[i];
    li.textContent = shop.name + ' views: ' + shop.views + ' : votes = ' + shop.votes;
    list.appendChild(li);
}
resultSection.appendChild(list);
}
let votingSession = 25;
function render() {
constructProductImage(leftImage, centerImage, rightImage);
counter++;
}




function clickHandler(event) {
votingSession--;
console.log(votingSession);

if (event.target.id == 'leftImage'
    || event.target.id == 'centerImage'
    || event.target.id == 'rightImage') {
    for (let i = 0; i < shopArray.length; i++) {
        if (shopArray[i].name == event.target.title) {
            shopArray[i].votes++;
            // console.log(shopArray[i].votes);
        }

    }
} render();
if (votingSession === 0) {
    createResultButton();
    imageSection.removeEventListener('click', clickHandler);
}
render();


}

imageSection.addEventListener('click', clickHandler);
function createResultButton() {
let button = document.createElement('button');
button.textContent = "show results";
button.addEventListener("click", showResult)
resultSection.appendChild(button);
createChart();

}

function resultsButtonHandler() {
showResult();
}



render();


function createChart() {
let context = document.getElementById('chart').getContext('2d');
let getProductNames = [];
let getProductVotes = [];
let getProductsViews = [];

for (let i = 0; i < shopArray.length; i++) {
    getProductNames.push(shopArray[i].name);
}
for (let i = 0; i < shopArray.length; i++) {
    getProductVotes.push(shopArray[i].votes);
}
for (let i = 0; i < shopArray.length; i++) {
    getProductsViews.push(shopArray[i].views);
}
let chartObject = {
    type: 'horizontalBar',
    data: {
        labels: getProductNames,
        datasets: [{
            label: 'products voting',
            backgroundColor: '#205a57',
            borderColor: '#205a57',
            data: getProductsViews
        },

        {
            label: 'products views',
            backgroundColor: '#f1f1f1',
            borderColor: '#205a57',
            data: getProductVotes
        }
        ]
    },

    options: {
        scales: {
            xAxes: [{
                barPercentage: 0.6
            }]
        }
    }
}
let chart = new Chart(context, chartObject);

}
localStorage.setItem('products', JSON.stringify(shopArray));
function parseLocalStorage() {
let localData = localStorage.getItem('products');
let parsingData = JSON.parse(localData);
console.log(parsingData);
render();
createChart();
}
parseLocalStorage();