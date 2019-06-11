/* eslint-disable no-undef */
'use strict';

function handleNewSubmit(){
  $('#dog-breed-form').submit(function(event){
    event.preventDefault();
    const dogBreed = $('.js-dog-search-entry').val();
    console.log(dogBreed);
    getDogBreed(dogBreed);
  });
}

// function displayResults(responseJson) {
//   console.log(responseJson);
//   //replace the existing image with the new one
//   $('.results-img').replaceWith(
//     `<img src="${responseJson.message}" class="results-img">`
//   )
//   //display the results section
//   $('.results').removeClass('hidden');
// }

function displayImages(responseJson, breed){
  $('.results').html(''); // 
  console.log(responseJson);
  console.log(`user wants us to display ${breed} images`);
    if (responseJson.status === 'success'){
    $('.results').html(`<img src = "${responseJson.message}">`);
  } else {
    $('.results').html('<h1>Error: Not a dog breed.</h1>');
  }
}


// function getDogImage(num) {
//   fetch(`https://dog.ceo/api/breeds/image/random/${num}`)
//     .then(response => response.json())
//     .then(responseJson =>  displayImages(responseJson, num))
//     .catch(error => alert('Something went wrong. Try again later.'));
// }


$(function() {
  console.log('App loaded! Waiting for submit!');
  handleNewSubmit();
});


function getDogBreed(breed){
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(response => response.json())
    .then(responseJson => displayImages(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}


//display 3 random dog images
//https://dog.ceo/api/breeds/image/random/3 Fetch!


//form for input # of dog images
//store input as variable