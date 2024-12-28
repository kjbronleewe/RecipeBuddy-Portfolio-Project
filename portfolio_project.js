const searchBtn=document.querySelector('#search');
searchBtn.addEventListener('click', fetchData);

async function fetchData() {
    try{
        let searchInputTxt=document.querySelector("#search-bar");
        let ingredient= searchInputTxt.value.toLowerCase();
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        if(!response.ok){
            throw new Error(`could not fetch resource`);
        }
        let data= await response.json();
        console.log(data.meals);
        console.log(data.meals[0].strMeal);
        displayMeals(data.meals);
    }
    catch(error){
        console.error(error)
    }
    
}
const cardDiv=document.querySelector('#card-container');

function displayMeals(meals){
    for (let meal of meals){
        let mealDiv=document.createElement('div');
        cardDiv.appendChild(mealDiv);

        let title=document.createElement('h5');
        title.textContent=meal.strMeal;
        mealDiv.appendChild(title);

        let image=document.createElement('img');
        image.src=meal.strMealThumb;
        image.width=250;
        image.style.borderRadius=20 + 'px';
        mealDiv.appendChild(image);

    }
}