'use strict'


// Global Variables
var parent = document.getElementById('product');

var allProducts = [];

var currentRound = 0;

var maxRounds = 25;


// Constructor Function
function Product(src, alt, title){
  this.filePath = src;
  this.alt = alt;
  this.title = title;
  this.votes = 0;
  this.views = 0;
  allProducts.push(this);
}


// Object Instances
new Product('img/bag.jpg', 'bag', 'Bag');
new Product('img/banana.jpg', 'banana', 'Banana');
new Product('img/bathroom.jpg', 'bathroom', 'Bathroom');
new Product('img/boots.jpg', 'boots', 'Boots');
new Product('img/breakfast.jpg', 'breakfast', 'Breakfast');
new Product('img/bubblegum.jpg', 'bubblegum', 'Bubblegum');
new Product('img/chair.jpg', 'chair', 'Chair');
new Product('img/cthulhu.jpg', 'cthulhu', 'Cthulhu');
new Product('img/dog-duck.jpg', 'dog-duck', 'Dog-Duck');
new Product('img/dragon.jpg', 'dragon', 'Dragon');
new Product('img/pen.jpg', 'pen', 'Pen');
new Product('img/pet-sweep.jpg', 'pet-sweep', 'Pet-Sweep');
new Product('img/scissors.jpg', 'scissors', 'Scissors');
new Product('img/shark.jpg', 'shark', 'Shark');
new Product('img/sweep.png', 'sweep', 'Sweep');
new Product('img/tauntaun.jpg', 'tauntaun', 'Tauntaun');
new Product('img/unicorn.jpg', 'unicorn', 'Unicorn');
new Product('img/usb.gif', 'usb', 'USB');
new Product('img/water-can.jpg', 'water-can', 'Water-Can');


// Our Method To Set Image To Page
Product.prototype.setImage = function(){
  var imageElement = document.createElement('img');
  imageElement.setAttribute('src', this.filePath);
  imageElement.setAttribute('alt', this.alt);
  imageElement.setAttribute('title', this.title);
  parent.appendChild(imageElement);
}


// Helper Function
function randomNumber(min=0, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Render Three Random Images To The DOM From Array
function getRandomProduct(){
  parent.textContent = '';
  var randomIndex = randomNumber(0, allProducts.length-1);
  var secondRandomIndex = randomNumber(0, allProducts.length-1);
  var thirdRandomIndex = randomNumber(0, allProducts.length-1);
  while(randomIndex === secondRandomIndex){
    secondRandomIndex = randomNumber(0, allProducts.length-1);
  }
  while(randomIndex === thirdRandomIndex || secondRandomIndex === thirdRandomIndex){
    thirdRandomIndex = randomNumber(0, allProducts.length-1);
  }
  allProducts[randomIndex].setImage();
  allProducts[randomIndex].views++;
  
  allProducts[secondRandomIndex].setImage();
  allProducts[secondRandomIndex].views++;
  
  allProducts[thirdRandomIndex].setImage();
  allProducts[thirdRandomIndex].views++;
}

getRandomProduct();


function eventHandler(){
  var titleOfProductClicked = event.target.title;
  for(var i = 0; i < allProducts.length; i++){
    if(titleOfProductClicked === allProducts[i].title){
      allProducts[i].votes++;
    }
  }
  currentRound++;
  if (currentRound < maxRounds){
    getRandomProduct();
  } else if (currentRound === maxRounds){
    console.log('max rounds', maxRounds);
    renderList();
    parent.removeEventListener('click', eventHandler);
  }
}


// Function Handle Click
parent.addEventListener('click', eventHandler);
    // remove the event listener (look up MDN remove event listener)
    // pay attention to the first two things that it wants so it knows what it is listening too


// Lab 11 Problem 4 - Results after voting has concluded

function renderList(){
  var unorderedList = document.createElement('ul');
  var title = document.createElement('p');
  title.textContent = ('Totals');
  unorderedList.appendChild(title);
  for (var i = 0; i < allProducts.length; i++){
    var listItem = document.createElement('li');
    listItem.textContent = (`${allProducts[i].title} had ${allProducts[i].votes} votes and was shown ${allProducts[i].views} times`);
    unorderedList.appendChild(listItem);
  }
  parent.appendChild(unorderedList);
};

