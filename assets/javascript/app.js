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
      divider += `<input class="form-check-input" type="checkbox" name="genreInput" id="${genres[i].value}" value="${genres[i].label}"`;
      divider += `>`;
      divider += `<label class="form-check-label" for="${genres[i].value}">${genres[i].label}</label>`;
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
        var checkbox = $(`#${genres.value}`)
        if (checkbox.is(':checked')){
          selectedGenres.push(checkbox.val())
        }
      })
      return getMovieGenres;
    }
    getMovieGenres();
    var queryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=" + selectedGenres + "&certification_country=US&certification=" + getRating() + "&api_key=" + movieAPIkey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response)
      var results = response.results;
      for (var i = 0; i < 5; i++) {
        var posterImage = $("<div>").addClass("swiper-slide");
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

});