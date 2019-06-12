/* eslint-disable indent */
/* eslint-disable no-undef */
'use strict';

const apiKey = 'GenR434Z2n5fdh8jqCCbGRdayEzVEGefkZKJIrKC'; /*your API key here*/
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  console.log(`params are ${params}`);
  if (params.stateCode === '') {
    params.stateCode = 'xx';
    //if empty put a character code that doesnt work so we get the correct error message
  }
  console.log(`state code entered is ${params.stateCode}`);
  let codes = params.stateCode.split(',');
  console.log(`code array code entered is ${codes}`);
  let str = 'https://developer.nps.gov/api/v1/parks?stateCode=';
  for (let i = 0; i < codes.length; i++) {
    if (i === 0) {
      str += codes[i];
    } else {
      str += `%2C${codes[i]}`;
    }
  }
  str += `&limit=${params.maxResults}&api_key=${apiKey}`;
  return str;
}
  // if (params.stateCode === '') {
  //   params.stateCode = 'xx';
  //   //if empty put a character code that doesnt work so we get the correct error message
  // }
  // let codes = state.split(',');
  // const queryItems = Object.keys(params)
  //   .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  // return queryItems.join('&');
//}

function displayResults(responseJson, maxResults) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').html('');
  if(responseJson.data.length === 0){
    $('#results-list').html('<p>Please enter a comma delimited list of 2 character state codes');
  }
  else{
     // iterate through the articles array, stopping at the max number of results
    for (let i = 0; i < responseJson.data.length & i < maxResults ; i++){
      // for each video object in the articles
      //array, add a list item to the results 
      //list with the article title, source, author,
      //description, and image
      //<h3>${responseJson.articles[i].url}">${responseJson.articles[i].title}</h3>
      $('#results-list').append(
        `<li><h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].description}</p>
        <a href='${responseJson.data[i].url}'>Link</a>
        <p>Directions Info / Address: ${responseJson.data[i].directionsInfo}</p>
        <p>${responseJson.data[i].weatherInfo}</p>
        </li>`
      );
    //display the results section  
      $('#results').removeClass('hidden');
    }
  }
   
}

function getNationalParks(query, maxResults=10) {
  const params = {
    stateCode: query,
    //language: "en",
    apiKey,
    maxResults,
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    let searchTerm = $('#js-search-term').val();
    let maxResults = parseInt($('#js-max-results').val());
    if (isNaN(maxResults) || maxResults <= 0) {
      maxResults = 10;
      console.log('User input was incorrect so we defaulted to 10');
    }
    $('#js-search-term').val('');
    $('#js-max-results').val('');
    event.preventDefault();
    getNationalParks(searchTerm, maxResults);
  });
  // $('form').submit(event => {
  //   event.preventDefault();
  //   const searchTerm = $('#js-search-term').val();
  //   const maxResults = $('#js-max-results').val();
  //   getNationalParks(searchTerm, maxResults);
  // });
}

$(watchForm);