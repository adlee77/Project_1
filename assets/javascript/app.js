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