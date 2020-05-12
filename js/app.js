'use strict'


// Global Variables
var parent = document.getElementById('product');

var allProducts = [];

var currentRound = 0;

var maxRounds = 5;

var names = [];

var votes = [];

var views = [];

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
new Product('img/bag.jpg', 'bag', 'R2D2 Luggage Bag');
new Product('img/banana.jpg', 'banana', 'Banana Slicer');
new Product('img/bathroom.jpg', 'bathroom', 'Bathroom iPad Stand');
new Product('img/boots.jpg', 'boots', 'Sandal RainBoots');
new Product('img/breakfast.jpg', 'breakfast', 'Breakfast Machine');
new Product('img/bubblegum.jpg', 'bubblegum', 'Meatball Bubblegum');
new Product('img/chair.jpg', 'chair', 'Novelty Chair');
new Product('img/cthulhu.jpg', 'cthulhu', 'Cthulhu Alien');
new Product('img/dog-duck.jpg', 'dog-duck', 'Dog-Duck Beak');
new Product('img/dragon.jpg', 'dragon', 'Dragon Meat');
new Product('img/pen.jpg', 'pen', 'Pen Utensil Caps');
new Product('img/pet-sweep.jpg', 'pet-sweep', 'Pet-Sweeper');
new Product('img/scissors.jpg', 'scissors', 'Pizza Scissors');
new Product('img/shark.jpg', 'shark', 'Shark Sleeping Bag');
new Product('img/sweep.png', 'sweep', 'Baby Sweep');
new Product('img/tauntaun.jpg', 'tauntaun', 'Tauntaun Sleeping Bag');
new Product('img/unicorn.jpg', 'unicorn', 'Unicorn Meat');
new Product('img/usb.gif', 'usb', 'USB Lizard Tail');
new Product('img/water-can.jpg', 'water-can', 'Novelty Water-Can');


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
// LAB 12: Update your algorithm so that new products are generated, confirm tht these products are not duplicates from the immediate previous set.
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


// Function Handle Click
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
    makeNamesArray();
  }
}



// Event Listener
parent.addEventListener('click', eventHandler);


// Lab 11 Problem 4 - Results after voting has concluded

function renderList(){
  var unorderedList = document.createElement('ul');
  var title = document.createElement('p');
  title.textContent = ('Results');
  unorderedList.appendChild(title);
  for (var i = 0; i < allProducts.length; i++){
    var listItem = document.createElement('li');
    listItem.textContent = (`${allProducts[i].title} had ${allProducts[i].votes} votes and was shown ${allProducts[i].views} times`);
    unorderedList.appendChild(listItem);
  }
  parent.appendChild(unorderedList);
};



// Function: set up empty names and votes arrays
// Loop over all of my items and make an array of just the names of my items

function makeNamesArray(){
  for(var i = 0; i < allProducts.length; i++){
    names.push(allProducts[i].title);
    votes.push(allProducts[i].votes);
    views.push(allProducts[i].views);
  }
  generateChart();
}

function generateChart(){
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: names,
          datasets: [{
              label: '# of Votes',
              data: votes,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
}


// My Chart
