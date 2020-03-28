var apiKey = "7e843602b804ea7449775e2616d01fe2";
var certification = {
  // G: G,
  // PG: PG,
  // PG13: PG-13,
  // R: R,
  // NC17: NC-17,
  // noRating: NR,
}
var genre;
var poster;
var movie;
var genres = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  scienceFiction: 878,
  tvMovie: 10770,
  thriller: 53,
  war: 10752,
  western: 37, 
}


// universal variables we will be using 
var ratingsToBeIncluded = [];
var preferredGenre = [];
var dietaryRestrictions = [];
var maxPrepTime = 0;
var preferredCuisine = [];

var movieObject = {
  movie1Name: "",
  movie1PosterURL: "",
  movie2Name: "",
  movie2PosterURL: "",
  movie3Name: "",
  movie3PosterURL: "",
  movie4Name: "",
  movie4PosterURL: "",
  movie5Name: "",
  movie5PosterURL: "",
}


var recipeObject = {
  recipe1Name: "",
  recipe1URL: "",
  recipe1ImageURL: "",

  recipe2Name: "",
  recipe2URL: "",
  recipe2ImageURL: "",

  recipe3Name: "",
  recipe3URL: "",
  recipe3ImageURL: "",

  recipe4Name: "",
  recipe4URL: "",
  recipe4ImageURL: "",

  recipe5Name: "",
  recipe5URL: "",
  recipe5ImageURL: "",
}


$(".btn-success").on("click", function (event){
  event.preventDefault();
  var queryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=" + genres + "&certification_country=US&certification=" + certification + "&api_key=" + apiKey;
  $.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  console.log(response);
})
})


// function to make slider of prep time work
const $valueSpan = $('.valueSpan2');
    const $value = $('#timeRange');
    $valueSpan.html($value.val());
    $value.on('input change', () => {
    $valueSpan.html($value.val());
 });


$("#submitButton").on("click", function() {
  if ($('#actionAndAdventure').is(':checked')) {
      preferredGenre.push(genres[0]);
      preferredGenre.push(genres[1]);
   }
   if ($('#animation').is(':checked')) {
      preferredGenre.push(genres[2]);
   }


findMovies();
findRecipes();
displayMovies();
displayRecipes();
});


function findMovies(){

}

function displayMovies(){

}

function findRecipes(){

}

function displayRecipes(){

}