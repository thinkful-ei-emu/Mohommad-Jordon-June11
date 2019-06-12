/* eslint-disable no-undef */
'use strict';

function handleNewSubmit(){
  $('#dog-search-form').submit(function(event){
    event.preventDefault();
    const numberOfDogs = parseInt($('.js-dog-search-entry').val());
    console.log(numberOfDogs);
    getDogImage(numberOfDogs);
  });
}

function displayImages(responseJson, num){
  $('.results').html('');
  console.log(responseJson);
  console.log(`user wants us to display ${num} images`);
  for(let i = 0; i < num; i++){
    console.log(`${responseJson.message[i]}`);
    $('.results').append(`<img src ="${responseJson.message[i]}">`);
  }



}


function getDogImage(num) {
  fetch(`https://dog.ceo/api/breeds/image/random/${num}`)
    .then(response => response.json())
    .then(responseJson =>  displayImages(responseJson, num))
    .catch(error => alert('Something went wrong. Try again later.'));
}


$(function() {
  console.log('App loaded! Waiting for submit!');
  handleNewSubmit();
});