$(document).ready(function () {
  var containerOne = $(".container-one")
  var containerTwo = $(".container-two");
  containerTwo.hide();
  $(".btn-success").on("click", function () {
    containerOne.hide();
    containerTwo.show();
  });
  $("#startButton").on("click", function () {
    containerOne.show();
    containerTwo.hide();
  });

  //RECIPE
  //dietary Restriction form call listener
  $(".dietRestriction").on("click", function (event) {
    var radioValue = $("input[name='choice-diet']:checked").val();
    if (radioValue === "true") {
      generateDietaryRestrictions()
    } else {
      $("#dietary-form").empty();
    }
  })
   //dietary restrictions pop up
   var FormStuff = {
    init: function () {
      this.applyConditionalRequired();
      this.bindUIActions();
    },
    bindUIActions: function () {
      $("input[type='radio'], input[type='checkbox']").on("change", this.applyConditionalRequired);
    },
    applyConditionalRequired: function () {
      $(".require-if-active").each(function () {
        var el = $(this);
        if ($(el.data("require-pair")).is(":checked")) {
          el.prop("required", true);
        } else {
          el.prop("required", false);
        }
      });
    }
  };
  FormStuff.init();
  var restrictions = [
    { label: "Vegan", value: "vegan" },
    { label: "Vegetarian", value: "vegetarian" },
    { label: "Dairy Free", value: "dairy-free" },
    { label: "Gluten Free", value: "gluten-free" },
    { label: "Peanut Free", value: "peanut-free" },
    { label: "Tree Nut Free", value: "tree-nut-free" },
    { label: "Soy Free", value: "soy-free" }
  ]
  function generateDietaryRestrictions() {
    for (var i = 0; i < restrictions.length; i++) {
      var divider = "<div class=\"form-check\">";
      divider += `<input class="form-check-input" type="checkbox" class="reveal-if-active" name="restrictionInput" id="${restrictions[i].value}" value="${restrictions[i].value}">`;
      divider += `<label class="form-check-label" for="${restrictions[i].value}">${restrictions[i].label}</label>`;
      divider += `</div>`;
      $("#dietary-form").append(divider);
    }
  }
  // function to make slider of prep time work
  const $valueSpan = $(".valueSpan2");
  const $value = $("#timeRange");
  $valueSpan.html($value.val());
  $value.on("input change", () => { $valueSpan.html($value.val()); });
  var cuisines = [
    { label: "American", value: "american" },
    { label: "Asian", value: "asian" },
    { label: "French", value: "french" },
    { label: "Indian", value: "indian" },
    { label: "Italian", value: "italian" },
    { label: "Mediterranean", value: "mediterranean" },
    { label: "Mexican", value: "mexican" },
    { label: "Middle Eastern", value: "middleeastern" }
  ]
  function generateCuisines() {
    for (var i = 0; i < cuisines.length; i++) {
      var divider = "<div class=\"form-check\">";
      divider += `<input class="form-check-input" type="checkbox" name="restrictionInput" id="${cuisines[i].value}" value="${cuisines[i].label}">`;
      divider += `<label class="form-check-label" for="${cuisines[i].value}">${cuisines[i].label}</label>`;
      divider += `</div>`;
      $("#cuisine-form").append(divider);
    }
  }
  generateCuisines();
  function getDietaryRestrictions() {
    if ($('#dietaryRestrictionsNo').is(':checked')) {
      return;
    }
    var myRestrictions = [];
    restrictions.forEach(function (restriction) {
    var checkbox = $(`#${restriction.value}`)
      if (checkbox.is(':checked')) {
        myRestrictions.push(checkbox.val())
      }
    })
    return myRestrictions;
  }
  function getPrepTime() {
    return $('#timeRange').val();
  }
  function getCuisines() {
    var myCuisines = []
    cuisines.forEach(function (cuisine) {
      var checkbox = $(`#${cuisine.value}`)
      if (checkbox.is(':checked')) {
        myCuisines.push(checkbox.val())
      }
    })
    return myCuisines;
  }
  function getIngredient() {
    return $("#ingredient").val().trim();
  }
  function buildParameter(param, values) {
    var queryFragment = "";
    values.forEach(function (value) {
      value = encodeURIComponent(value);
      queryFragment += `&${param}=${value}`;
    })
    return queryFragment;
  }
  function findRecipes() {
    var urlComponents = [
      { param: "q", value: [getIngredient()] },
      { param: "health", value: getDietaryRestrictions() },
      { param: "cuisineType", value: getCuisines() },
      { param: "time", value: [getPrepTime()] }
    ]
    var baseURL = `https://api.edamam.com/search?app_id=${recipeID}&app_key=${recipeAPIKey}`;
    urlComponents.forEach(function (component) {
      baseURL += buildParameter(component.param, component.value);
    })
    $.ajax({
      url: baseURL,
      method: "GET",
      dataType: "json"
    }).then(function (response) {
      var results = response.hits;
      var resultRow = $("<tr>");
      for (var i = 0; i < 3; i++) {
        var recipeTitle = results[i].recipe.label;
        var recipeImg = results[i].recipe.image;
        var rowInfo = $("<tr>");
        var td = $("<td>");
        var image = $("<img>").addClass("recipe-images");
        var link = $("<a>").attr("href", results[i].recipe.url);
        link.text(results[i].recipe.url);
        image.attr("src", recipeImg);
        resultRow.append('<td class="recipe"><h1>' + recipeTitle + '</h1>' + '<img src=' + recipeImg + '><div><a href="' + results[i].recipe.url + '"target=_blank>Click here for recipe!</a></div></td>');
      }
      $("#foods").append(resultRow);
    })
  }
//MOVIE
  function generateRatings() {
    var certification = ["G", "PG", "PG-13", "R"];
    for (var i = 0; i < certification.length; i++) {
      var divider = "<div class=\"form-check\">";
      divider += `<input class="form-check-input" type="radio" name="ratingInput" id="${certification[i]}Rating" value="${certification[i]}"`;
      if (i === 0) { divider += ` checked`; }
      divider += `>`;
      divider += `<label class="form-check-label" for="${certification[i]}Rating">${certification[i]}</label>`;
      divider += `</div>`;
      $("#rating-input").append(divider);
    }
  }
  generateRatings();
var genres = [
  {label: "Action", value:28},
  {label: "Comedy", value: 35},
  {label: "Drama", value: 18},
  {label: "Horror", value: 27},
  {label: "Family", value: 10751},
  {label: "Crime", value: 80},
  {label: "Mystery", value: 9648},
  {label: "Romance", value: 10749},
  {label: "Fantasy", value: 14},
  {label: "Science Fiction", value: 878},
  {label: "Thriller", value: 53},
]
  function generateGenres() {
    for (var i =0; i < genres.length; i++){
      var divider = "<div class=\"form-check\">";
      divider += `<input class="form-check-input" type="checkbox" name="genreInput" id="${genres[i].label}" value="${genres[i].value}"`;
      divider += `>`;
      divider += `<label class="form-check-label" for="${genres[i].label}">${genres[i].label}</label>`;
      divider += `</div>`;
      $("#genre-input").append(divider);
      }
    }
    generateGenres();
  
    function findMovies() {
    function getRating() {
      if ($('#GRating').is(':checked')) {
        return "G";
      }
      else if ($('#PGRating').is(':checked')) {
        return "PG";
      }
      else if ($('#PG-13Rating').is(':checked')) {
        return "PG-13";
      }
      else {
        return "R";
      }
    }
    
    var selectedGenres = [];

    function getMovieGenres(){
      genres.forEach(function(genres){
        var checkbox = $(`#${genres.label}`)
        if (checkbox.is(':checked')){
          selectedGenres.push(checkbox.val())
          console.log(selectedGenres);
        }
      })
      return selectedGenres;
    }

    getMovieGenres();
    var queryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=" + selectedGenres + "&certification_country=US&certification=" + getRating() + "&api_key=" + movieAPIkey;
    console.log(queryURL)
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response)
      var results = response.results;
      for (var i = 0; i < 5; i++) {
        var posterImage = $("<div>").addClass("swiper-slide");
        console.log("response.results[i] is " + response.results[i])
        posterImage.attr("style", `background-image:url(${"http://image.tmdb.org/t/p/w500" + response.results[i].poster_path})`);
        $("#posterContainer").append(posterImage);
      }
      initializeCarousel();
    });
  }
  function initializeCarousel() {
    var swiper = new Swiper('.swiper-container', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }

  //return results
  $("#submitButton").on("click", function () {
    findMovies();
    findRecipes()
  });

=======
  // universal variables we will be using 
  var preferredGenre = [];

 var containerOne = $(".container-one")
 var containerTwo = $(".container-two");
 containerTwo.hide();

 $(".btn-success").on("click", function () {
   containerOne.hide();
   containerTwo.show();
 });

 $("#startButton").on("click", function () {
   containerOne.show();
   containerTwo.hide();
 });

 //dietary Restriction form call listener
 $(".dietRestriction").on("click", function (event){
   
   var radioValue = $("input[name='choice-diet']:checked").val();
   console.log(radioValue);
   if (radioValue === "true") {
     generateDietaryRestrictions()
   } else {
     $("#dietary-form").empty();
   }
 })

 console.log("js running");

 // function to make slider of prep time work
 const $valueSpan = $(".valueSpan2");
 const $value = $("#timeRange");
 $valueSpan.html($value.val());
 $value.on("input change", () => { $valueSpan.html($value.val()); });
 console.log("slider loaded");
 //dietary restrictions pop up
 var FormStuff = {
   init: function () {
     this.applyConditionalRequired();
     this.bindUIActions();
   },
   bindUIActions: function () {
     $("input[type='radio'], input[type='checkbox']").on("change", this.applyConditionalRequired);
   },
   applyConditionalRequired: function () {

     $(".require-if-active").each(function () {
       var el = $(this);
       if ($(el.data("require-pair")).is(":checked")) {
         el.prop("required", true);
       } else {
         el.prop("required", false);
       }
     });
   }
 };
 FormStuff.init();
 console.log("restrictions dropdown loaded");


   
 function generateRatings() {
   var certification = ["G","PG", "PG-13","R"];
   
   for (var i = 0; i< certification.length; i++){
     var divider =   "<div class=\"form-check\">";
     divider +=      `<input class="form-check-input" type="radio" name="ratingInput" id="${certification[i]}Rating" value="${certification[i]}"`;
     if (i===0){ divider += ` checked`; }
     divider +=      `>`;
     divider +=      `<label class="form-check-label" for="${certification[i]}Rating">${certification[i]}</label>`;
     divider +=      `</div>`;

     $("#rating-input").append(divider);
   }
 }
 generateRatings();

var genres = {
  action: 28,
  adventure: 12,
  //animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  //history: 36,
  horror: 27,
  //music: 10402,
  mystery: 9648,
  romance: 10749,
  scienceFiction: 878,
  //tvMovie: 10770,
  thriller: 53,
  war: 10752,
  //western: 37
};

function generateGenres(){
  Object.keys(genres).forEach(function (key) {
    var divider =   "<div class=\"form-check\">";
    divider +=      `<input class="form-check-input" type="checkbox" style="margin: 10px 0px 15px 0px" name="genreInput" id="${key}Rating" value="${genres[key]}"`;
    divider +=      `>`;
    divider +=      `<label class="form-check-label" for="${key}Rating">${key}</label>`;
    divider +=      `</div>`;

    $("#genre-input").append(divider);
  })
 }
 generateGenres();

 var restrictions = [
   {label: "Vegan", value: "vegan"},
   {label: "Vegetarian", value: "vegetarian"},
   {label: "Dairy Free", value: "dairy-free"},
   {label: "Gluten Free", value: "gluten-free"},
   {label: "Peanut Free", value: "peanut-free"},
   {label: "Tree Nut Free", value: "tree-nut-free"},
   {label: "Soy Free", value: "soy-free"}
 ]

 function generateDietaryRestrictions(){
   for (var i = 0; i< restrictions.length; i++){
     var divider =   "<div class=\"form-check\">";
     divider +=      `<input class="form-check-input" type="checkbox" class="reveal-if-active" name="restrictionInput" id="${restrictions[i].value}" value="${restrictions[i].value}">`;
     divider +=      `<label class="form-check-label" for="${restrictions[i].value}">${restrictions[i].label}</label>`;
     divider +=      `</div>`;

     $("#dietary-form").append(divider);
   }
 }

 var cuisines = [
   {label: "American", value: "american"},
   {label: "Asian", value: "asian"},
   {label: "French", value: "french"},
   {label: "Indian", value: "indian"},
   {label: "Italian", value: "italian"},
   {label: "Mediterranean", value: "mediterranean"},
   {label: "Mexican", value: "mexican"},
   {label: "Middle Eastern", value: "middleeastern"}
 ]

 function generateCuisines(){
   for (var i = 0; i< cuisines.length; i++){
     var divider =   "<div class=\"form-check\">";
     divider +=      `<input class="form-check-input" type="checkbox" name="restrictionInput" id="${cuisines[i].value}" value="${cuisines[i].label}">`;
     divider +=      `<label class="form-check-label" for="${cuisines[i].value}">${cuisines[i].label}</label>`;
     divider +=      `</div>`;

     $("#cuisine-form").append(divider);
   }
   
 }

 generateCuisines();


 $("#submitButton").on("click", function () {
   //genres
   pushMovieGenres();

   findMovies();
   findRecipes()
 });

 function getRating() {
   if ($('#GRating').is(':checked')) {
     return "G";
   }
   else if ($('#PGRating').is(':checked')) {
     return "PG";
   }
   else if ($('#PG-13Rating').is(':checked')) {
     return "PG-13";
   }
   else {
     return "R";
   }
 }

 function pushMovieGenres() {
   console.log("pushMovies Function");
   if ($('#actionAndAdventure').is(':checked')) {
     preferredGenre.push("action");
     preferredGenre.push("adventure");
   }
   if ($('#animation').is(':checked')) {
     preferredGenre.push("animation");
   }
   if ($('#comedy').is(':checked')) {
     preferredGenre.push("comedy");
   }
   if ($('#crime').is(':checked')) {
     preferredGenre.push("crime");
   }
   if ($('#documentary').is(':checked')) {
     preferredGenre.push("documentary");
   }
   if ($('#family').is(':checked')) {
     preferredGenre.push("family");
   }
   if ($('#horror').is(':checked')) {
     preferredGenre.push("horror");
   }
   if ($('#mystery').is(':checked')) {
     preferredGenre.push("mystery");
   }
   if ($('#romance').is(':checked')) {
     preferredGenre.push("romance");
   }
   if ($('#scienceFiction').is(':checked')) {
     preferredGenre.push("scienceFiction");
   }
   if ($('#thriller').is(':checked')) {
     preferredGenre.push("thriller");
   }
   if ($('#war').is(':checked')) {
     preferredGenre.push("war");
   }
   console.log(preferredGenre);
 }

 function getDietaryRestrictions() {
   if ($('#dietaryRestrictionsNo').is(':checked')) {
     return;
   }

   var myRestrictions = [];

   restrictions.forEach(function (restriction) {
     var checkbox = $(`#${restriction.value}`)

     if (checkbox.is(':checked')) {
       myRestrictions.push(checkbox.val())
     }
   })

   return myRestrictions;
 }

 function getPrepTime() {
   return $('#timeRange').val();
 }

 function getCuisines() {
   var myCuisines = []

   cuisines.forEach(function (cuisine) {
     var checkbox = $(`#${cuisine.value}`)

     if (checkbox.is(':checked')) {
       myCuisines.push(checkbox.val())
     }
   })

   return myCuisines;
 }

 function getIngredient() {
   return $("#ingredient").val().trim();
 }


 function initializeCarousel() {
   var swiper = new Swiper('.swiper-container', {
     effect: 'coverflow',
     grabCursor: true,
     centeredSlides: true,
     slidesPerView: 'auto',
     coverflowEffect: {
       rotate: 50,
       stretch: 0,
       depth: 100,
       modifier: 1,
       slideShadows: true,
     },
     pagination: {
       el: '.swiper-pagination',
     },
   });
 }

 function findMovies() {
   var queryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=" + preferredGenre + "&certification_country=US&certification=" + getRating() + "&api_key=" + movieAPIkey;
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function (response) {
     var results = response.results;

     for (var i = 0; i < 5; i++) {
       var posterImage = $("<div>").addClass("swiper-slide");
       posterImage.attr("style", `background-image:url(${"http://image.tmdb.org/t/p/w500" + response.results[i].poster_path})`);
       $("#posterContainer").append(posterImage);
       console.log(response);
       console.log(results[i].poster_path);
     }

     initializeCarousel();
   });
 }

 // TODO: allow values to be string OR array
 function buildParameter(param, values) {
   var queryFragment = "";
   // each loop, append a fragment of the fragment
   values.forEach(function (value) {
     // e.g health, [peanut-free, tree-nut-free]
     // 1st iteration should add '&health=peanut-free
     value = encodeURIComponent(value);
     queryFragment += `&${param}=${value}`;
   })
   console.log(queryFragment);
   return queryFragment;
 }

 function findRecipes() {
   // var ingredient = "chicken"
   // var preferredCuisine = ["chinese"];
   // var dietaryRestrictions = ["tree-nut-free", "peanut-free"];
   // var maxPrepTime = "120";


   // given a list of [{parameter, values}]
   // iterate over the list, appending to baseURL
   // q=${ingredient}${buildParameter("health",dietaryRestrictions)}&time=${maxPrepTime}

   // iterate over dietaryRestrictions available with true or false
   var urlComponents = [
     { param: "q", value: [getIngredient()] },
     { param: "health", value: getDietaryRestrictions() },
     { param: "cuisineType", value: getCuisines() },
     { param: "time", value: [getPrepTime()] }
   ]
   var baseURL = `https://api.edamam.com/search?app_id=${recipeID}&app_key=${recipeAPIKey}`;
   urlComponents.forEach(function (component) {
     console.log(component);
     baseURL += buildParameter(component.param, component.value);
   })

   console.log(baseURL);
   $.ajax({
     url: baseURL,
     method: "GET",
     dataType: "json"
   }).then(function (response) {
     var results = response.hits;
     console.log(results);

     var resultRow = $("<tr>");

     for (var i = 0; i < 3; i++) {
       var recipeTitle = results[i].recipe.label;
       console.log(recipeTitle);
       var recipeImg = results[i].recipe.image;

       var rowInfo = $("<tr>");
       var td = $("<td>");

       // var newDiv = $("<div>");
       // newDiv.addClass("recipes");
       var image = $("<img>").addClass("recipe-images");
       var link = $("<a>").attr("href", results[i].recipe.url);
       link.text(results[i].recipe.url);
       // console.log(link);

       // newDiv.append(h1, image, link);
       image.attr("src", recipeImg);

       // add CSS styling
       resultRow.append('<td class="recipe"><h1>' + recipeTitle + '</h1>' + '<img src=' + recipeImg + '><div><a href="' + results[i].recipe.url + '"target=_blank>Click here for recipe!</a></div></td>');
     }

     $("#foods").append(resultRow);
   })
 }
});