$(document).ready(function () {
  console.log("js running");

  var apiKey = "7e843602b804ea7449775e2616d01fe2";

  var recipeAPIKey = "3bf128271c09f258d82a4a064242f753";
  var recipeID = "d25a4b08";

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
  var ratingsToBeIncluded;
  var preferredGenre = [];
  var dietaryRestrictions = [];
  var maxPrepTime = 0;
  var preferredCuisine = [];
  var ingredient = "";
  var healthOptions = [
    {
      api: "Dairy",
      user: "dairy-free"
    },
    {
      api: "Kosher",
      user: "kosher"
    },
    {
      api: "Gluten",
      user: "gluten-free"
    },
    {
      api: "Peanuts",
      user: "peanut-free"
    },
    {
      api: "Shellfish",
      user: "shellfish-free"
    },
    {
      api: "Soy",
      user: "soy-free"
    },
    {
      api: "Tree Nuts",
      user: "tree-nut-free"
    },
    {
      api: "Sugar-conscious",
      user: "sugar-conscious"
    },
    {
      api: "Vegan",
      user: "vegan"
    },
    {
      api: "Vegetarian",
      user: "vegetarian"
    }
  ]

  $("input[type='radio'], input[type='checkbox]").on("change", function () {
    healthOptions.forEach(option=>{
     const newButton= $(`<input type='checkbox' name=${option.user}/><label for=${option.user}>${option.user}</label>`)
     $("dietary-form").append(newButton)
  })
}); 


  $("#submitButton").on("click", function () {
    console.log("on click function");
    //ratings
   // pushRatings();
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

  /*function pushRatings() {
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
    else if ($('#RRating').is(':checked')) {
      ratingsToBeIncluded = "R";
    }
    else {
      ratingsToBeIncluded.push("NC-17");
    }
    console.log(ratingsToBeIncluded);
  }*/

  function pushMovieGenres() {
    console.log("pushMovies Function");
    if ($('#actionAndAdventure').is(':checked')) {
      preferredGenre.push("action");
      preferredGenre.push("adventure");
    }
    if ($('#animation').is(':checked')) {
      preferredGenre.push("animation");
      //preferredGenre.push($(this).val());
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
    var restrictions = ["vegan", "vegetarian", "dairy-free", "gluten-free", "peanut-free", "tree-nut-free", "soy-free"];

    if ($('#dietaryRestrictionsNo').is(':checked')) { }
    else {
      if ($('#dietaryRestrictionsYes').is(':checked') && $('#vegan').is(':checked')) {
        dietaryRestrictions.push(restrictions[0]);
      }
      if ($('#dietaryRestrictionsYes').is(':checked') && $('#vegetarian').is(':checked')) {
        dietaryRestrictions.push(restrictions[1]);
      }
      if ($('#dietaryRestrictionsYes').is(':checked') && $('#dairyFree').is(':checked')) {
        dietaryRestrictions.push(restrictions[2]);
      }
      if ($('#dietaryRestrictionsYes').is(':checked') && $('#glutenFree').is(':checked')) {
        dietaryRestrictions.push(restrictions[3]);
      }
      if ($('#dietaryRestrictionsYes').is(':checked') && $('#peanutFree').is(':checked')) {
        dietaryRestrictions.push(restrictions[4]);
      }
      if ($('#dietaryRestrictionsYes').is(':checked') && $('#treenutFree').is(':checked')) {
        dietaryRestrictions.push(restrictions[5]);
      }
      if ($('#dietaryRestrictionsYes').is(':checked') && $('#soyFree').is(':checked')) {
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


  function findMovies() {
    var queryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=" + preferredGenre + "&certification_country=US&certification=" + ratingsToBeIncluded + "&api_key=" + apiKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
    });



  }

  function findRecipes() {
    ingredient = "chicken"
    preferredCuisine =//"&cuisineType=Chinese";
    dietaryRestrictions = "&health=peanut-free&health=tree-nut-free";
    maxPrepTime = "120";


    //TODO make enumerable function for health&cuisineType
    var baseURL = `https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=${ingredient}${dietaryRestrictions}&time=${maxPrepTime}&app_id=${recipeID}&app_key=${recipeAPIKey}`;

    console.log(baseURL);
    $.ajax({
      url: baseURL,
      method: "GET"
    }).then(function (response) {
      var results = response.hits;
      console.log(results);

      for (var i = 0; i < results.length; i++) {
        var recipeTitle = results[i].recipe.label;
        console.log(recipeTitle);
        var recipeImg = results[i].recipe.image;
        var recipeLink = results[i].recipe.url;

        var newDiv = $("<div>");
        newDiv.addClass("recipes");
        var image = $("<img>").addClass("recipe-images");
        var h1 = $("<h1>").text(recipeTitle);
        var link = $("<a>").attr("href", recipeLink);

        newDiv.append(h1, image, link);
        image.attr("src", recipeImg);

        $("#results").append(newDiv);

        

      }
    })

    // Variables for storing user selections
    // var dietPreference = "&health=" + $("#diet").val();
    // console.log(dietPreference);
    // var cuisineType = "&cuisineType=" + $("#cuisine").val();
    // console.log(cuisineType);
    // var ingredient = "q=" + $("#ingredient").val().trim();

    
  }




});