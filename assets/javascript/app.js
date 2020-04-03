$(document).ready(function () {

   // universal variables we will be using 
   var ratingsToBeIncluded;
   var preferredGenre = [];
   var dietaryRestrictions = [];
   var maxPrepTime = 0;
   var preferredCuisine = [];
   var ingredient = "";
   var dietaryRestriction = false;
   var health = ["dairy-free", "gluten-free", "peanut-free", "soy-free", "tree-nut-free", "vegan", "vegetarian"];


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
      dietaryRestriction = true;
      generateDietaryRestrictions()
    } else {
      dietaryRestriction = false;
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


    
  function generateRatings (){
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

  function generateGenres(){
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
    };
    var genreNames =["action","adventure", "animation", "comedy", "crime", "documentary", 
                      "family", "horror", "mystery", "romance", "Science Fiction",
                      "thriller", "war"]
    var associatedIDs = [28, 12, 16, 35, 80, 99, 10751, 27, 
                          9648, 10749, 878, 53, 10752]
    console.log(genres.action);
    
    for (var i = 0; i< genreNames.length; i++){
      var divider =   "<div class=\"form-check\">";
      divider +=      `<input class="form-check-input" type="checkbox" name="genreInput" id="${genreNames[i]}Rating" value="${associatedIDs[i]}"`;
      divider +=      `>`;
      divider +=      `<label class="form-check-label" for="${associatedIDs[i]}Rating">${genreNames[i]}</label>`;
      divider +=      `</div>`;

      $("#genre-input").append(divider);
    }
  }
  generateGenres();


  var restrictions = ["vegan", "vegetarian", "dairy-free", "gluten-free", "peanut-free", "tree-nut-free", "soy-free"];

  function generateDietaryRestrictions(){
    
    for (var i = 0; i< restrictions.length; i++){
      var divider =   "<div class=\"form-check\">";
      divider +=      `<input class="form-check-input" type="checkbox" class="reveal-if-active" name="restrictionInput" id="${restrictions[i]}Rating" value="${restrictions[i]}">`;
      divider +=      `<label class="form-check-label" for="${restrictions[i]}Rating">${restrictions[i]}</label>`;
      divider +=      `</div>`;

      $("#dietary-form").append(divider);
    }
  }

  
var cuisines = ["American", "Asian", "French", "Indian",
                    "Italian", "Mediterranean", "Mexican", "Middle Eastern"];
  function generateCuisines(){
    for (var i = 0; i< cuisines.length; i++){
      var divider =   "<div class=\"form-check\">";
      divider +=      `<input class="form-check-input" type="checkbox" name="restrictionInput" id="${cuisines[i]}Rating" value="${cuisines[i]}">`;
      divider +=      `<label class="form-check-label" for="${cuisines[i]}Rating">${cuisines[i]}</label>`;
      divider +=      `</div>`;

      $("#cuisine-form").append(divider);
    }
    
  }

  generateCuisines();





  $("#submitButton").on("click", function () {
    console.log("on click function");
    //ratings
    pushRatings();
    //genres
    pushMovieGenres();
    //restrictions
    pushRestrictions();
    //preparation time
    pushPrepTime();
    //cuisine
    pushCuisine();
    // get search ingredient
    getIngredient();


    findMovies();
    findRecipes()
  });

  function pushRatings() {
    console.log("pushRatings Function");
    if ($('#GRating').is(':checked')) {
      ratingsToBeIncluded = "G";
    }
    else if ($('#PGRating').is(':checked')) {
      ratingsToBeIncluded = "PG";
    }
    else if ($('#PG-13Rating').is(':checked')) {
      ratingsToBeIncluded = "PG-13";
    }
    else {
      ratingsToBeIncluded = "R";
    }
    console.log(ratingsToBeIncluded);
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

  function pushRestrictions() {
  
    if ($('#dietaryRestrictionsNo').is(':checked')) { }
    else {
      if ($('#dietaryRestrictionsYes').is(':checked') && $('#vegan').is(':checked')) {
        dietaryRestrictions.push(restrictions[0]);
      }
      if ($('#dietaryRestrictionsYes').is(':checked') && $('#vegetarian').is(':checked')) {
        dietaryRestrictions.push(restrictions[1]);
      }
      if ($('#dietaryRestrictionsYes').is(':checked') && $('#dairy-free').is(':checked')) {
        dietaryRestrictions.push(restrictions[2]);
      }
      if ($('#dietaryRestrictionsYes').is(':checked') && $('#gluten-free').is(':checked')) {
        dietaryRestrictions.push(restrictions[3]);
      }
      if ($('#dietaryRestrictionsYes').is(':checked') && $('#peanut-free').is(':checked')) {
        dietaryRestrictions.push(restrictions[4]);
      }
      if ($('#dietaryRestrictionsYes').is(':checked') && $('#tree-nut-free').is(':checked')) {
        dietaryRestrictions.push(restrictions[5]);
      }
      if ($('#dietaryRestrictionsYes').is(':checked') && $('#soy-free').is(':checked')) {
        dietaryRestrictions.push(restrictions[6]);
      }
    }

    console.log(dietaryRestrictions);
  }

  function pushPrepTime() {
    var time = $('#timeRange').val();
    maxPrepTime = time;
    console.log(maxPrepTime);
  }

  function pushCuisine() {
    var cuisines = [];
    if ($('#american').is(':checked')) {
      preferredCuisine.push("American");
    }
    if ($('#asian').is(':checked')) {
      preferredCuisine.push("Asian");
    }
    if ($('#french').is(':checked')) {
      preferredCuisine.push("French");
    }
    if ($('#indian').is(':checked')) {
      preferredCuisine.push("Indian");
    }
    if ($('#italian').is(':checked')) {
      preferredCuisine.push("Italian");
    }
    if ($('#mediterranean').is(':checked')) {
      preferredCuisine.push("Mediterranean");
    }
    if ($('#mexican').is(':checked')) {
      preferredCuisine.push("Mexican");
    }
    if ($('#middleEastern').is(':checked')) {
      preferredCuisine.push("Middle Eastern");
    }
    console.log(preferredCuisine);
  }

  function getIngredient() {
    ingredient = $("#ingredient").val().trim();
    console.log(ingredient);
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
    var queryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=" + preferredGenre + "&certification_country=US&certification=" + ratingsToBeIncluded + "&api_key=" + movieAPIkey;
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
      { param: "q", value: [ingredient] },
      { param: "health", value: dietaryRestrictions },
      { param: "cuisineType", value: preferredCuisine },
      { param: "time", value: [maxPrepTime] }
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