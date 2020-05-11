'use strict'


// Global Variables
var parent = document.getElementById('product');

var allProducts = [];


// Constructor Function
function product(src, alt, title){
  this.filePath = src;
  this.alt = alt;
  this.title = title;
  this.votes = 0;
  this.views = 0;
  allProducts.push(this);
}


// Object Instances
new product('img/bag.jpg', 'bag', 'bag');
new product('img/banana.jpg', 'banana', 'banana');
new product('img/bathroom.jpg', 'bathroom', 'bathroom');
new product('img/boots.jpg', 'boots', 'boots');
new product('img/breakfast.jpg', 'breakfast', 'breakfast');
new product('img/bubblegum.jpg', 'bubblegum', 'bubblegum');
new product('img/chair.jpg', 'chair', 'chair');
new product('img/cthulhu.jpg', 'cthulhu', 'cthulhu');
new product('img/dog-duck.jpg', 'dog-duck', 'dog-duck');
new product('img/dragon.jpg', 'dragon', 'dragon');
new product('img/pen.jpg', 'pen', 'pen');
new product('img/pet-sweep.jpg', 'pet-sweep', 'pet-sweep');
new product('img/scissors.jpg', 'scissors', 'scissors');
new product('img/shark.jpg', 'shark', 'shark');
new product('img/sweep.png', 'sweep', 'sweep');
new product('img/tauntaun.jpg', 'tauntaun', 'tauntaun');
new product('img/unicorn.jpg', 'unicorn', 'unicorn');
new product('img/usb.gif', 'usb', 'usb');
new product('img/water-can.jpg', 'water-can', 'water-can');


// Our Method To Set Image To Page
product.prototype.setImage = function(){
  var imageElement = document.createElement('img');
  imageElement.setAttribute('src', this.filePath);
  imageElement.setAttribute('alt', this.alt);
  imageElement.setAttribute('title', this.title);
  parent.appendChild(imageElement);
}


// Helper Function
function randomNumber(min=0, max){
  return Math.floor(math.random() * (max - min + 1)) + min;
}


// Render Three Random Images To The DOM From Array
function getRandomProduct(){
  parent.textContent = '';
  var randomIndex = randomNumber(0, allProducts.length-1);
  var secondRandomIndex = randomNumber(0, allProducts.length-1);
  while(randomIndex === secondRandomIndex){
    secondRandomIndex = randomNumber(0, allProducts.length-1);
  }
  allProducts[randomIndex].setImage();
  allProducts[secondRandomIndex].setImage();
}

getRandomProduct();