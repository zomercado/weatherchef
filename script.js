

function simulateWeather(weatherType) {
    console.log('JavaScript file is loaded!');
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
    const apiKey = "8a520ce37ee341a7906535bbd54c5f0a";
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
            return [
              "soup",
              "hot chocolate",
              "stew",
              "baked goods",
              "warm dessert",
            ];
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
    const apiKey = "8a520ce37ee341a7906535bbd54c5f0a"; // Replace with your actual API key
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
  
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
      //use Javascript to display the data on the page.
      // Update the DOM to display the fetched recipes in the output con
      const recipeContainer = document.getElementById("output");
    
      // Clear previous recipes
      recipeContainer.innerHTML = "";
    
      // Loop through the recipes and create elements for each
      recipes.results.forEach((recipe) => {
        console.log('Recipe Object:', recipe);
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");
    
        const recipeTitle = document.createElement("h3");
        recipeTitle.textContent = recipe.title;
    
        //image for recipe
        
        const recipeImage = document.createElement("img");
        recipeImage.src = recipe.image;
        recipeImage.alt = recipe.title; // Set 'alt' attribute for accessibility

       // Fetch the recipe URL using the recipe ID
    fetchRecipeUrl(recipe.id)
    .then((url) => {
      if (url) {
        const viewRecipeButton = document.createElement("button"); //view recipe button
        viewRecipeButton.textContent = "View Recipe"; // button text
        viewRecipeButton.classList.add("view-recipe-button"); // Add a class for styling
        viewRecipeButton.addEventListener("click", () => {
            window.open(url, "_blank"); // Open the recipe URL in a new tab/window when the button is clicked
          });
        recipeCard.appendChild(viewRecipeButton);
      } else {
        console.error("Recipe URL not available.");
      }
    })

        //adding the recipe information to each recipe card as a child
    
        recipeCard.appendChild(recipeTitle);
        recipeCard.appendChild(recipeImage);

        //adds recipe card to the container with each search result
        recipeContainer.appendChild(recipeCard);
      });
      
      // to insert the recipe information into your HTML
      console.log("Fetched recipes:", recipes);
      // Update the DOM here based on the fetched recipes
    }
    