'use strict'


// Global Variables
var parent = document.getElementById('product');

var allProducts = [];

var currentRound = 0;


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
new Product('img/bag.jpg', 'bag', 'bag');
new Product('img/banana.jpg', 'banana', 'banana');
new Product('img/bathroom.jpg', 'bathroom', 'bathroom');
new Product('img/boots.jpg', 'boots', 'boots');
new Product('img/breakfast.jpg', 'breakfast', 'breakfast');
new Product('img/bubblegum.jpg', 'bubblegum', 'bubblegum');
new Product('img/chair.jpg', 'chair', 'chair');
new Product('img/cthulhu.jpg', 'cthulhu', 'cthulhu');
new Product('img/dog-duck.jpg', 'dog-duck', 'dog-duck');
new Product('img/dragon.jpg', 'dragon', 'dragon');
new Product('img/pen.jpg', 'pen', 'pen');
new Product('img/pet-sweep.jpg', 'pet-sweep', 'pet-sweep');
new Product('img/scissors.jpg', 'scissors', 'scissors');
new Product('img/shark.jpg', 'shark', 'shark');
new Product('img/sweep.png', 'sweep', 'sweep');
new Product('img/tauntaun.jpg', 'tauntaun', 'tauntaun');
new Product('img/unicorn.jpg', 'unicorn', 'unicorn');
new Product('img/usb.gif', 'usb', 'usb');
new Product('img/water-can.jpg', 'water-can', 'water-can');


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


// Lab 11 Problem 3
// Function 25 Rounds Of Voting
function roundsOfVoting(){
  for(var i = 0; i < 25; i++){
    currentRound++;
    console.log('the current round number is ', currentRound);
  } 
  if (currentRound == '24'){
    alert('Thanks for participating!');
  }
}


roundsOfVoting();


// Function Handle Click
parent.addEventListener('click', function(){
  var titleOfProductClicked = event.target.title;
  for(var i = 0; i < allProducts.length; i++){
    if(titleOfProductClicked === allProducts[i].title){
      allProducts[i].votes++;
    }
  }
  getRandomProduct();  

});


// Lab 11 Problem 4 - Results after voting has concluded
// Banana Slicer had 3 votes and was shown 5 times
// listItem.textcontent = (`${this.allProducts[i].title} had ${this.allProducts[i].votes} and was shown ${this.allProducts[1]} times`)

Product.prototype.renderList = function(){
  var unorderedList = document.createElement('ul');
  var title = document.createElement('p');
  title.textContent = ('Totals');
  for (var i = 0; i < this.allProducts.length; i++){
    var listItem = document.createElement('li');
    listItem.textContent = (`${this.allProducts[i].title} had ${this.allProducts[i].votes} and was shown ${this.allProducts[1]} times`);
  }
  parent.appendChild(unorderedList);
};

Product.renderList();