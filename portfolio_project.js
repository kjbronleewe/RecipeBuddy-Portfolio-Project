document.querySelector('#searchForm').addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('form submitted');
  fetchData();
});

async function fetchData() {
  try {
    let searchInputTxt = document.querySelector('#search-bar');
    let ingredient = searchInputTxt.value.toLowerCase();
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredient}`
    );
    if (!response.ok) {
      throw new Error(`could not fetch resource`);
    }
    let data = await response.json();
    if (data.meals) {
      console.log(data.meals);
      displayMeals(data.meals);
    } else {
      console.log('No meals found');
    }
    searchInputTxt.value = '';
  } catch (error) {
    console.error(error);
  }
}

const cardDiv = document.querySelector('#card-container');
const descriptionDiv = document.querySelector('#description');

function displayMeals(meals) {
  descriptionDiv.remove(descriptionDiv.firstElementChild);
  cardDiv.innerHTML = '';

  for (let meal of meals) {
    let mealDiv = document.createElement('div');
    mealDiv.className = 'meal-div';
    cardDiv.appendChild(mealDiv);

    let title = document.createElement('h5');
    title.textContent = meal.strMeal;
    title.className = 'meal-title'; 
    mealDiv.appendChild(title);

    let image = document.createElement('img');
    image.src = meal.strMealThumb;
    image.width = 250;
    image.style.borderRadius = 20 + 'px';
    mealDiv.appendChild(image);

    let getRecipe = document.createElement('a');
    getRecipe.setAttribute('href', meal.strSource);
    getRecipe.setAttribute('target', '_blank');
    getRecipe.textContent = 'Get the Recipe';
    getRecipe.className = 'recipe-link';
    mealDiv.appendChild(getRecipe);
  }
}
