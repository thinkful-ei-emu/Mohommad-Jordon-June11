'use strict';

function handleNewSubmit(){
  $('#dog-search-form').submit(function(event){
    event.preventDefault();
    const numberOfDogs = parseInt($('.js-dog-search-entry').val());
    console.log(numberOfDogs);
    getDogImage(numberOfDogs);
  })
}

function displayResults(responseJson){
    responseJson.message.forEach(function(element){
        $('results').append(`<img src="${element} class="results-img"`);
    })
}

function getDogImage(num) {
  fetch(`https://dog.ceo/api/breeds/image/random/${num}`)
    .then(response => response.json())
    .then(responseJson => console.log(responseJson))
}


$(function() {
  console.log('App loaded! Waiting for submit!');
  handleNewSubmit();
});



//display 3 random dog images
//https://dog.ceo/api/breeds/image/random/3 Fetch!


//form for input # of dog images
//store input as variable