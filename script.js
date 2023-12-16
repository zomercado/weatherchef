//function to hide the loader button

function hideLoaderContainer() {
  const loaderContainer = document.querySelector(".loader-container");
  if (loaderContainer) {
    loaderContainer.style.display = "none";
  }
}

function simulateWeather(weatherType) {
  console.log("JavaScript file is loaded!");

  //hide the loader button

  hideLoaderContainer();

  // Show the recipe card container
  const recipeContainer = document.getElementById("output");
  recipeContainer.style.display = "grid";

  // Perform actions based on the selected weather type
  switch (weatherType) {
    case "hot":
      // Call a function to fetch and display hot weather recipes
      fetchAndDisplayRecipes("hot");
      break;
    case "cold":
      // Call a function to fetch and display cold weather recipes
      fetchAndDisplayRecipes("cold");
      break;
    case "rainy":
      // Call a function to fetch and display cold weather recipes
      fetchAndDisplayRecipes("rainy");
      break;
  }
}

// AJAXcall to make a request to the Spoonacular recipe API
function fetchAndDisplayRecipes(weatherType) {
  const apiKey = "4edcc8d43b3b4f40be183c60bec57949";
  const keywords = getKeywordsForWeatherType(weatherType);

  // Create an array to store promises for each keyword
  const requests = keywords.map((keyword) => {
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${keyword}`;
    return fetch(apiUrl).then((response) => response.json());
  });

  // Use Promise.all to wait for all requests to complete
  Promise.all(requests)
    .then((dataArray) => {
      // Concatenate the results from different keywords
      const combinedResults = dataArray.reduce(
        (acc, data) => acc.concat(data.results),
        []
      );
      displayRecipes({ results: combinedResults });
    })
    .catch((error) => {
      console.error("Error fetching recipes:", error);
    });
}

function getKeywordsForWeatherType(weatherType) {
  switch (weatherType) {
    case "hot":
      return ["salads", "smoothie", "BBQ", "dessert"];
    case "cold":
      return ["soup", "hot chocolate", "baked goods", "warm dessert"];
    case "rainy":
      return [
        "soup",
        "comfort",
        "warm beverage",
        "stew",
        "casserole",
        "one-pot",
        "baked",
      ];
    default:
      return [];
  }
}

// Function to fetch the recipe URL using the recipe ID
function fetchRecipeUrl(recipeId) {
  const apiKey = "4edcc8d43b3b4f40be183c60bec57949"; // Replace with your actual API key
  const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&include=sourceUrl`;

  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      return data.sourceUrl; // Extract the recipe URL from the response
    })
    .catch((error) => {
      console.error("Error fetching recipe URL:", error);
      return null; // Return null in case of an error
    });
}

function displayRecipes(recipes) {
  // Update the DOM to display the fetched recipes in the output container
  const recipeContainer = document.getElementById("output");

  // Clear previous recipes
  recipeContainer.innerHTML = "";

  // Loop through the recipes and create elements for each
  recipes.results.forEach((recipe) => {
    console.log("Recipe Object:", recipe);

    // Check if essential data is available
    if (recipe.title && recipe.image) {
      const recipeCard = document.createElement("div");
      recipeCard.classList.add("recipe-card");

      // Image for the recipe
      const recipeImage = document.createElement("img");
      recipeImage.src = recipe.image;
      recipeImage.alt = recipe.title; // Set 'alt' attribute for accessibility
      recipeCard.appendChild(recipeImage);

      const recipeTitle = document.createElement("h3");
      recipeTitle.textContent = recipe.title;
      recipeTitle.classList.add("recipe-name");
      recipeCard.appendChild(recipeTitle);

      // Fetch the recipe URL using the recipe ID
      fetchRecipeUrl(recipe.id).then((url) => {
        if (url) {
          const viewRecipeButton = document.createElement("button");
          viewRecipeButton.textContent = "View Recipe";
          viewRecipeButton.classList.add("view-recipe-button");
          viewRecipeButton.addEventListener("click", () => {
            window.open(url, "_blank");
          });
          recipeCard.appendChild(viewRecipeButton);
        } else {
          console.error("Recipe URL not available.");
        }
      });

      // Add the recipe card to the container
      recipeContainer.appendChild(recipeCard);
    } else {
      console.error("Invalid recipe data:", recipe);
    }
  });

  // Log fetched recipes
  console.log("Fetched recipes:", recipes);
}

// Function to add border and scale effect on hover for recipe cards
function addHoverEffectsToRecipeCards() {
  // Use event delegation on a parent element that is present in the DOM
  const recipeContainer = document.getElementById("output");

  // Check if the container is found
  if (recipeContainer) {
    // Add event listener to the container
    recipeContainer.addEventListener("mouseenter", function (event) {
      const card = event.target.closest(".recipe-card");
      if (card) {
        card.style.border = "2px solid #FF6347"; // Change border color to a red shade
        card.style.transform = "scale(1.2)"; // Enlarge the recipe card
      }
    });

    recipeContainer.addEventListener("mouseleave", function (event) {
      const card = event.target.closest(".recipe-card");
      if (card) {
        card.style.border = "none"; // Reset border on mouse leave
        card.style.transform = "scale(1)"; // Return to the original size
      }
    });
  }
}

// Call the function to add hover effects to recipe cards
addHoverEffectsToRecipeCards();
