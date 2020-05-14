'use strict'


// Global Variables
var parent = document.getElementById('product');

var parentList = document.getElementById('listParent');

var allProducts = [];

var currentRound = 0;

var maxRounds = 25;

var names = [];

var votes = [];

var views = [];

var uniqueIndexArray = [];


// check our LS to see if we have an array of products

// Putting JS into JSON
if(localStorage.getItem('Products') === null){
  new Product('img/bag.jpg', 'bag', 'R2D2 Luggage Bag', 0, 0);
  new Product('img/banana.jpg', 'banana', 'Banana Slicer', 0, 0);
  new Product('img/bathroom.jpg', 'bathroom', 'Bathroom iPad Stand', 0, 0);
  new Product('img/boots.jpg', 'boots', 'Sandal RainBoots', 0, 0);
  new Product('img/breakfast.jpg', 'breakfast', 'Breakfast Machine', 0, 0);
  new Product('img/bubblegum.jpg', 'bubblegum', 'Meatball Bubblegum', 0, 0);
  new Product('img/chair.jpg', 'chair', 'Novelty Chair', 0, 0);
  new Product('img/cthulhu.jpg', 'cthulhu', 'Cthulhu Alien', 0, 0);
  new Product('img/dog-duck.jpg', 'dog-duck', 'Dog-Duck Beak', 0, 0);
  new Product('img/dragon.jpg', 'dragon', 'Dragon Meat', 0, 0);
  new Product('img/pen.jpg', 'pen', 'Pen Utensil Caps', 0, 0);
  new Product('img/pet-sweep.jpg', 'pet-sweep', 'Pet-Sweeper', 0, 0);
  new Product('img/scissors.jpg', 'scissors', 'Pizza Scissors', 0, 0);
  new Product('img/shark.jpg', 'shark', 'Shark Sleeping Bag', 0, 0);
  new Product('img/sweep.png', 'sweep', 'Baby Sweep', 0, 0);
  new Product('img/tauntaun.jpg', 'tauntaun', 'Tauntaun Sleeping Bag', 0, 0);
  new Product('img/unicorn.jpg', 'unicorn', 'Unicorn Meat', 0, 0);
  new Product('img/usb.gif', 'usb', 'USB Lizard Tail', 0, 0);
  new Product('img/water-can.jpg', 'water-can', 'Novelty Water-Can', 0, 0);
} else {
  debugger;
  var productsFromLocalStorage = localStorage.getItem('Products');
  var productsTurnedBackIntoJavaScript = JSON.parse(productsFromLocalStorage);
  console.log('this is my parsed array', productsTurnedBackIntoJavaScript);
  for (var i = 0; i < productsTurnedBackIntoJavaScript.length; i++){
    new Product(
      productsTurnedBackIntoJavaScript[i].filePath,
      productsTurnedBackIntoJavaScript[i].alt, 
      productsTurnedBackIntoJavaScript[i].title, 
      productsTurnedBackIntoJavaScript[i].votes,
      productsTurnedBackIntoJavaScript[i].views); 
  }
}  



// Constructor Function
function Product(src, alt, title, votes, views){
  this.filePath = src;
  this.alt = alt;
  this.title = title;
  this.votes = votes;
  this.views = views;
  allProducts.push(this);
}




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
function getRandomIndex(){
  var index = randomNumber(0, allProducts.length-1);
  while(uniqueIndexArray.includes(index)){
    index = randomNumber(0, allProducts.length-1);
  }
  uniqueIndexArray.push(index);
  if(uniqueIndexArray.length > 6){
    uniqueIndexArray.shift();
  }
  return index;
}


function getRandomProduct(){
  parent.textContent = '';
  var firstIndex = getRandomIndex();
  var secondIndex = getRandomIndex();
  var thirdIndex = getRandomIndex();
  
  
  allProducts[firstIndex].setImage();
  allProducts[firstIndex].views++;
  
  allProducts[secondIndex].setImage();
  allProducts[secondIndex].views++;
  
  allProducts[thirdIndex].setImage();
  allProducts[thirdIndex].views++;
  
}

getRandomProduct();


// Function Handle Click
function eventHandler(){
  var titleOfProductClicked = event.target.title;
  for(var i = 0; i < allProducts.length; i++){
    if(titleOfProductClicked === allProducts[i].title){
      allProducts[i].votes++;
      // save our allProducts array into local storage
    }
  }
  currentRound++;
  if (currentRound < maxRounds){
    getRandomProduct();
  } else if (currentRound === maxRounds){
    console.log('max rounds', maxRounds);
    parent.removeEventListener('click', eventHandler);
    makeNamesArray();
  }
  var stringifiedProducts = JSON.stringify(allProducts);
  localStorage.setItem('Products', stringifiedProducts);
}


// Event Listener
parent.addEventListener('click', eventHandler);


// Function: Render List
function renderList(){
  var unorderedList = document.createElement('ul');
  var title = document.createElement('h2');
  title.textContent = ('Results');
  unorderedList.appendChild(title);
  for (var i = 0; i < allProducts.length; i++){
    var listItem = document.createElement('li');
    listItem.textContent = (`- ${allProducts[i].title} had ${allProducts[i].votes} votes and was shown ${allProducts[i].views} times`);
    unorderedList.appendChild(listItem);
  }
  parentList.appendChild(unorderedList);
};


// Function: set up empty names, votes and views arrays
// Loop over all of my items and make an array of just the names of my items
function makeNamesArray(){
  for(var i = 0; i < allProducts.length; i++){
    names.push(allProducts[i].title);
    votes.push(allProducts[i].votes);
    views.push(allProducts[i].views);
  }
  generateChart();
  renderList();
}


// My Chart
// Needs to display the number of times a product was viewed
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
          },
          {
            label: '# of Views',
            data: views,
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
        responsive: true,
        maintainAspectRatio: false,
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
