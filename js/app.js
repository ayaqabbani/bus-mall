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
let viewsList=[];
function constructProductImage(image){
    let index = randomNumber(0,shopArray.length-1);
    let selectedShop = shopArray[index];
    shopArray[index].views++;
    image.src = selectedShop.path;
    image.title = selectedShop.name;
    image.alt = selectedShop.name;
}

function doRender() {
    for (let i=0;i<products.length;i++){
       let productName = products[i];
       let path;
       if ( products[i] === 'sweep'){
        path = 'png'
       }else if (products[i] === 'usb'){
            path = 'gif'
        } 
        else {
            path= 'jpg'
        }
       let shop = new Shop(productName,path);
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
       li.textContent = shop.name + ' views: ' + shop.views + ' : votes = '  + shop.votes;
       list.appendChild(li);
       }
    resultSection.appendChild(list);
}
let votingSession = 25
function render() {
    constructProductImage(leftImage);
    constructProductImage(centerImage);
    constructProductImage(rightImage);
    counter++;
   
}




function clickHandler(event){
    votingSession--;
    console.log(votingSession);

    if (event.target.id == 'leftImage' 
    || event.target.id == 'centerImage'
    || event.target.id == 'rightImage'){
            for(let i=0;i<shopArray.length;i++){
                if (shopArray[i].name == event.target.title){
                    shopArray[i].votes++;
                    // console.log(shopArray[i].votes);
            } 

    }
}
if (votingSession===0){
    alert('ilove you');
    createResultButton();
    imageSection.removeEventListener('click',clickHandler);
}
render();


}

imageSection.addEventListener('click',clickHandler);
function createResultButton(){
    alert('ilove you');
    let button = document.createElement('button');
    button.textContent= "show results";
    button.addEventListener ("click",showResult)
  resultSection.appendChild(button);
 
}

function resultsButtonHandler(){
    showResult();
}


doRender();
render();