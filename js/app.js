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

const imageSection=document.getElementById('images');
const leftImage=document.getElementById('leftImage');
const centerImage=document.getElementById('centerImage');
const rightImage=document.getElementById('rightImage');
let counter = 0;

// shop class
function Shop(name,imgExt){
    this.name=name;
    this.views=0;
    this.votes=0;
    this.path=`./img/${name}.${imgExt}`;
}

let shopArray=[];

function randomNumber(min,max){
    return Math.floor(Math.random() * (max - min +1)) + min
}

function constructProductImage(image){
    let index = randomNumber(0,shopArray.length-1);
    let selectedShop = shopArray[index];
    selectedShop.views++;
    image.src = selectedShop.path;
    image.title = selectedShop.products;
    image.alt = selectedShop.name;
}

function doRender() {
    for (let i=0;i<10;i++){
       let productName = products[i];
       let shop = new Shop(productName,'jpg');
       shopArray[i] = shop;

    }

    render();
}
let resultSection = document.getElementById('aya');

function showResult() {
    let list = document.createElement('ul');
    for (let i=0;i<shopArray.length;i++){
       let li= document.createElement('li');
       let shop=shopArray[i];
       li.textContent='products = ' + shop.name +  ' ,views = ' + shop.views + ' ,votes = ' + shop.votes;
       list.appendChild(li);
       }
    resultSection.appendChild(list);
}

function render() {
    if (counter == 25){
        showResult();
        return;
    }
    constructProductImage(leftImage);
    constructProductImage(centerImage);
    constructProductImage(rightImage);
    counter++;
}

  
function clickHandler(event){
    if (event.target.id == 'leftImage' 
    || event.target.id == 'centerImage'
    || event.target.id == 'rightImage'){
        for(let i=0;i<shopArray.length;i++){
            if (shopArray[i].name == event.target.title){
                shopArray[i].votes++;
                console.table(shopArray[i]);
            }
        }
        render();
    }
}

imageSection.addEventListener('click',clickHandler);

doRender();