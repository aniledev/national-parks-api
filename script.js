"use strict";

const apiKey = ""; //INSERT API KEY HERE
const baseURL = "https://developer.nps.gov/api/v1/parks";

// create a function that formats the query params to add to the base URL. This will take in a params object
function formatQueryParams(params) {
  // use Object.keys to access each key in the params object
  // use .map array method to modify each key in the new array
  // use encodeURIComponent to escape characters that don't register properly
  const queryItems = Object.keys(params).map(
    (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  // use .join() to combine the query items into a single string
  return queryItems.join("&");
}

// this is the function that does the heavy lifting of actually getting the results from the API
function getSearchResults(query, limit = 10) {
  // creating the parameters that need to be formatted
  const params = {
    stateCode: query, //ADD A .VAL() VARIABLE FOR THE STATE INPUT
    limit,
    api_key: apiKey,
  };

  //creating our full API url
  const queryString = formatQueryParams(params);
  const url = baseURL + "?" + queryString;
  console.log(url);

  // fetch method send the GET request to the server using the API url we constructed
  // if the response is successful, return the repsonse in a json format
  // else throw an erorr
  // then console.log the the json data
  //   fetch(url)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       throw new Error(response.statusText);
  //     })
  //     .then((responseJson) => console.log(JSON.stringify(responseJson)))
  //     .catch((err) => {
  //       $(`#js-error-message`).text(`Something went wrong: ${err.message}`);
  //     });
  // }
}

//this function handles the click on the form and captures the values
function watchForm() {
  $("form").submit((event) => {
    // prevent the default action
    event.preventDefault();
    console.log("user clicked button");
    // variables used to pass into getSearchResults()
    const stateSearch = $(".state-search").val();
    const limit = $(".max-results").val();
    console.log(stateSearch);
    console.log(limit);
    getSearchResults(stateSearch, limit);
  });
}

$(watchForm);
