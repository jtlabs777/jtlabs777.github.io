// Foursquare API Info
const foursquareKey = 'fsq3yAqzMRqDlw3NRkmmUwPbxnjDpE11kja5UaQBjmLc4ew=';
const url = 'https://api.foursquare.com/v3/places/search?near=';

// OpenWeather Info
const openWeatherKey = 'd8f2e487164fc7d049ea5c24121a7573';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const limit =`&limit=`;

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $placeDivs = [$("#place1"), $("#place2"), $("#place3"), $("#place4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: foursquareKey,
  }
};

// Add AJAX functions here:
 const getPlaces = async () => {

    const city = $input.val();
    const urlToFetch = url + city + limit + 10;
    try {
      const response = await fetch(urlToFetch, options);
      if (response.ok) {
        const jsonResponse = await response.json();
        const places = jsonResponse.results;
        console.log(places);
        return places;
      }
     throw new Error('Error fetching');
    } catch(error){
      console.log(error);
    }

};

const getForecast = async () => {
  const urlTofetch = weatherUrl + '?q=' + $input.val() + '&APPID=' + openWeatherKey;
  try {
    const response = await fetch(urlTofetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
};


// Render functions
const renderPlaces = (places) => {
  
  $placeDivs.forEach(($place, index) => {
    // Add your code here:
    
    const place = places[index];
    const placeIcon = place.categories[0].icon;
    const placeImgSrc = placeIcon.prefix + 'bg_64' + placeIcon.suffix;
    const placeContent = createPlaceHTML(place.name, place.location, placeImgSrc);
     
     
    $place.append(placeContent);
   
    
  });
  $destination.append(`<h2>${places[0].location.locality}</h2>`);
};

const renderForecast = (forecast) => {
  let weatherContent = createWeatherHTML(forecast);
  console.log(`this is working`)
  $weatherDiv.append(weatherContent);
};

const executeSearch = () => {
  $placeDivs.forEach(place => place.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getPlaces()
  .then((places) => {
      return renderPlaces(places);
  })
  .catch((error) => {
    console.log(`getPlaces: ${error}`);
  });
  getForecast()
  .then((forecast) => renderForecast(forecast))
  .catch((error) => {
    console.log(`getForecast: ${error}`);
  });
  return false;
}

$submit.click(executeSearch);