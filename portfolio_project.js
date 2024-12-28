async function fetchData() {
    try{
        let ing=document.querySelector("#ingredient");
        let searchInputTxt= ing.value.toLowerCase();

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        if(!response.ok){
            throw new Error(`could not fetch resource`);
        }

        let data= await response.json();
        console.log(data);
        console.log(data.meals[0].strMeal);

    }
    catch(error){
        console.error(error)
    }
    
}
