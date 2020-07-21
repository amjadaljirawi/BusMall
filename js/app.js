'use strict';

var imageVew = document.getElementById('imagesVew');



 var allImages = [];


var totalClicks = 0;

var imgOneIndex;
var imgTowIndex;
var imgthreeIndex;


 function ProductImages(name, path){
    this.name = name;
    this.path = path;
    this.numberOfClicks = 0;
    this.numberOfTimesShown = 0;
    allImages.push(this);
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

    while (imgOneIndex === imgTowIndex === imgthreeIndex){
        imgTowIndex = generateRandomNumber(); 
        imgOneIndex = generateRandomNumber();
        imgthreeIndex = generateRandomNumber();
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
            console.log(allImages);

        }
    } else {
        generateUserMessage();
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