"use strict";

const apiKey = "CgU3nM4dc2cwW6xpZfeiLZZWfuLrWYgIQum5reiI"; //INSERT API KEY HERE
const baseURL = "https://developer.nps.gov/api/v1/parks";

// create a function that formats the query params to add to the base URL. This will take in a params object
function formatQueryParams(params) {
  // use Object.keys to access each key in the params object
  // use .map array method to modify each key in the new array
  // use encodeURIComponent to escape characters that don't register properly
  const queryItems = Object.keys(params).map((key) => `${key}=${params[key]}`);
  // use .join() to combine the query items into a single string
  return queryItems.join("&");
}

// this is the function that does the heavy lifting of actually getting the results from the API
function getSearchResults(stateSearch, limit = 10) {
  // this params object is based on API documentation and gets passed into formatQueryParams()
  const params = {
    stateCode: stateSearch,
    limit,
    api_key: apiKey,
  };

  // creating our full API url
  const queryString = formatQueryParams(params);
  const url = baseURL + "?" + queryString;
  console.log(url);

  // fetch method send the GET request to the server using the API url we constructed
  // if the response is successful, return the repsonse in a json format
  // else throw an erorr
  // then console.log the the json data
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayResults(responseJson))
    .catch((err) => {
      $(`#js-error-message`).text(`Something went wrong: ${err.message}`);
    });
}

//this function displays the data in a readable format
function displayResults(responseJson) {
  console.log(responseJson.data);
  $("#results-list").empty();
  for (let i = 0; i < responseJson.data.length; i++) {
    $("#results-list").append(`<li>
		<a href="${responseJson.data[i].url}"target="_blank"><h3>${responseJson.data[i].fullName} -- ${responseJson.data[i].states}</h3></a>
		<p>${responseJson.data[i].addresses[1].postalCode}</p>
		<p>${responseJson.data[i].description}</h2></li>`);
  }
  $("#results").removeClass("hidden");
}

//this function handles the click on the form and captures the values
function watchForm() {
  $("form").submit((event) => {
    // prevent the default action
    event.preventDefault();
    console.log("user clicked button");
    // variables used to pass into getSearchResults()
    //  const stateCodeParam = "stateCode";

    const stateSearch = $(".state-search").val().split(", ").join(",");
    //  [fl, ca];
    //  state = fl & state = ca;
    //  fl & ca;
    const uri = `${encodeURIComponent(stateSearch)}`;
    const limit = $(".max-results").val();

    console.log(stateSearch);
    console.log(limit);
    getSearchResults(stateSearch, limit);
  });
}

$(watchForm);
