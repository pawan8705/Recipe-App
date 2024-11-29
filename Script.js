let searchbox = document.querySelector(".SearchBox");
let searchbtn = document.querySelector(".searchbtn");
let recipecontainer = document.querySelector(".recipe-container");
let recipedetailscontent = document.querySelector(".recipe-details-content");
let recipeclosebtn = document.querySelector(".recipe-closebtn");

let fetchRecipes = async (quary) => {
    recipecontainer.innerHTML = "<h2>Fetching Recipes...</h2>";

    try {
        let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${quary}`);
        let response = await data.json();
        recipecontainer.innerHTML = "";

        response.meals.forEach(meal => {
            let recipediv = document.createElement("div");
            recipediv.classList.add('recipe');
            recipediv.innerHTML = `<img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>`
            let button = document.createElement('button');
            button.textContent = "View Recipe";
            recipediv.appendChild(button);
            recipecontainer.appendChild(recipediv);

            // Adding addEventListener to recipe btn

            button.addEventListener("click", () => {
                openRecipePopup(meal);
            });
            recipecontainer.appendChild(recipediv);
        });
    }
    catch (error) {
        recipecontainer.innerHTML = "<h2>Error In Fetching Recipes...</h2>";
    }
}


let fetchIngradents = (meal) => {
    let ingredentsList = '';
    for (let i = 1; i <= 20; i++) {
        let ingredent = meal[`strIngredient${i}`];
        if (ingredent) {
            let measure = meal[`strMeasure${i}`];
            ingredentsList += `<li>${measure} ${ingredent}</li>`
        }
        else {
            break;
        }
    }
    return ingredentsList;
}

let openRecipePopup = (meal) => {

    recipedetailscontent.innerHTML = `
    <h2 class ="recipename">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingredientlist">${fetchIngradents(meal)}</ul>
    <div class="recipeinstruction">
        <h3>Instruction : </h3>
        <p>${meal.strInstructions}</p>
    </div>`
    recipedetailscontent.parentElement.style.display = "block";
}

recipeclosebtn.addEventListener("click", () => {
    recipedetailscontent.parentElement.style.display = "none";
});

searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    let searchinput = searchbox.value.trim();
    if (!searchinput) {
        recipecontainer.innerHTML = `<h2>Type The Meal In The Search Box...</h2>`;
        return;
    }
    fetchRecipes(searchinput);
});
