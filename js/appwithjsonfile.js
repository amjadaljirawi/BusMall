'use strict';

var imageVew = document.getElementById('imagesVew');



 var allImages = [];


var totalClicks = 0;
var lableNames = [];
var imgOneIndex;
var imgTowIndex;
var imgthreeIndex;
var dataNumberOfClicks =[];
var numberOfClicks = [];




 function ProductImages(name, path){
    this.name = name;
    this.path = path;
    this.numberOfClicks = 0;
    this.numberOfTimesShown = 0;
    allImages.push(this);
    lableNames.push(this.name);
 }

 new ProductImages('bag','img/bag.jpg');
 new ProductImages('banana', 'img/banana.jpg');
 new ProductImages('bathroom', 'img/bathroom.jpg');
 new ProductImages('boots', 'img/boots.jpg');
 new ProductImages('breakfast', 'img/breakfast.jpg');
 new ProductImages('bubblegum', 'img/bubblegum.jpg');
 new ProductImages('chair', 'img/chair.jpg');
 new ProductImages('cthulhu', 'img/cthulhu.jpg');
 new ProductImages('dog-duck', 'img/dog-duck.jpg');
 new ProductImages('dragon', 'img/dragon.jpg');
 new ProductImages('pen', 'img/pen.jpg');
 new ProductImages('pet-sweep', 'img/pet-sweep.jpg');
 new ProductImages('scissors', 'img/scissors.jpg');
 new ProductImages('shark', 'img/shark.jpg');
 new ProductImages('sweep', 'img/sweep.png');
 new ProductImages('tauntaun', 'img/tauntaun.jpg');
 new ProductImages('unicorn', 'img/unicorn.jpg');
 new ProductImages('usb', 'img/usb.gif');
 new ProductImages('water-can', 'img/water-can.jpg');
 new ProductImages('wine-glass', 'img/wine-glass.jpg');


 generateRandomImage()


 
imageVew.addEventListener('click', imageClick)

function generateRandomImage(){
    
    
    var imgOne = document.getElementById('imageProduct1');
    var imgTow = document.getElementById('imageProduct2');
    var imgThree = document.getElementById('imageProduct3');
    
    imgOneIndex = generateRandomNumber(); 
    imgTowIndex = generateRandomNumber();
    imgthreeIndex = generateRandomNumber();

    while (imgOneIndex === imgTowIndex){
        imgTowIndex = generateRandomNumber(); 
    }

    while (imgOneIndex === imgthreeIndex){
        imgthreeIndex = generateRandomNumber();
    
    }
    while (imgthreeIndex === imgTowIndex){
        imgTowIndex = generateRandomNumber();
        ;
    }

    
    var leftPath = allImages[imgOneIndex].path;
    var rightPath = allImages[imgTowIndex].path;
    var midPath = allImages[imgthreeIndex].path;
    allImages[imgOneIndex].numberOfTimesShown += 1;
    allImages[imgTowIndex].numberOfTimesShown += 1;
    allImages[imgthreeIndex].numberOfTimesShown += 1;
    imgOne.setAttribute('src', leftPath);
    imgTow.setAttribute('src', rightPath);
    imgThree.setAttribute('src', midPath);

}

function generateRandomNumber(){
    return Math.floor(Math.random() * allImages.length );
}

function imageClick(){
    if (totalClicks < 25 ){
        var clickedElement = event.target;
        var clickedElementId = clickedElement.id;

        if(clickedElementId === 'imageProduct1' || clickedElementId === 'imageProduct2' || clickedElementId === 'imageProduct3'){
            totalClicks +=1;

            if(clickedElementId === 'imageProduct1'){
                allImages[imgOneIndex].numberOfClicks +=1;
            }

            if(clickedElementId === 'imageProduct2'){
                allImages[imgTowIndex].numberOfClicks +=1;
            }
            if(clickedElementId === 'imageProduct3'){
                allImages[imgthreeIndex].numberOfClicks +=1;
            }
            generateRandomImage();
            console.log("to see working");
        }
    } else {
        populateNumberOfClicksArr();
        generateUserMessage();
        generateChart();
        storeOurimgOrder();
        imageVew.removeEventListener('click', imageClick);
    }
}

function generateUserMessage(){
    var ulElement = document.getElementById('finalResult');    
    
    for (let index = 0; index < allImages.length; index++) {
        var listItem = document.createElement('li');
        listItem.textContent = allImages[index].name + ' has been shown ' + allImages[index].numberOfTimesShown + ' and has been clicked '+allImages[index].numberOfClicks;
        ulElement.appendChild(listItem);
    }


}
function populateNumberOfClicksArr(){
    for (let index = 0; index < allImages.length; index++) {
        numberOfClicks.push( allImages[index].numberOfClicks);   
    }
}

function storeOurimgOrder(){
    // in order to save our array of objects into the localstorage we will need to formate our json object in json string
    var jsonstringorder = JSON.stringify(allImages);
    // creare a new property in our localstorage 
    localStorage.setItem('orders',jsonstringorder);
  }
  console.log('inital');
  console.table(allImages);
  parseLocalStorage();
  console.log('after updating');
  console.table(allImages);
  // this function is responsible for parsing the json string to json object 
  function parseLocalStorage(){
    var imgorderarray =JSON.parse(localStorage.getItem('orders'))
    console.log(imgorderarray);
    // this funtcion will update the newly created objects with the old literation values
    update(imgorderarray);
  
  }
  
  function update(imgorderarray){
    for (let index = 0; index < allImages.length; index++) {
      allImages[index].numberOfClicks = imgorderarray[index].numberOfClicks;
      allImages[index].numberOfTimesShown = imgorderarray[index].numberOfTimesShown;
      
    }
  }
function generateChart(){
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: lableNames,
        datasets: [{
          label: '# of Clicks',
          data: numberOfClicks,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
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

document.getElementById('clearStroage').addEventListener('click', function(){
    localStorage.clear();
  });

  
//   document.getElementById('reload').addEventListener('click',   ;
// });