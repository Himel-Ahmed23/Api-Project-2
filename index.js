let mealRecipes = (searchText)=>{
    let url =`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayRecipes(data.meals))
};

let displayRecipes =(meals)=>{
    let container = document.getElementById('container');
    container.innerHTML="";

    meals.forEach(meal => {
        console.log(meal);
        let div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML=`
            <div class="card h-100 text-bg-dark">
                <img src="${meal.strMealThumb}" class="card-img-top">
                <div class="card-body text-center">
                  <h3 class="card-title fw-bold">${meal.strMeal}</h3>
                 <h5 class="card-text mt-3">${meal.strArea} Dish</h5>
                 <p>Belongs to ${meal.strCategory} Category</p>
                </div>
            </div>
        `
        container.appendChild(div);
    });
    loader(false);
};

document.getElementById('searchBtn').addEventListener('click', searchRecipe=(e)=>{
    e.preventDefault();

    let search = document.getElementById('Search');
    search.classList.add('d-none');
    loader(true);

    let inputText = document.getElementById('searchBox');
    let inputValue = inputText.value;
    mealRecipes(inputValue);
    inputText.value="";
});

document.getElementById('searchBox').addEventListener('keypress', searchEnter =(e)=>{
    if(e.key === 'Enter' ){
        loader(true);
        let inputText = document.getElementById('searchBox');
        let inputValue = inputText.value;
        mealRecipes(inputValue);
        inputText.value="";
    }
});

let loader =(isLoading)=>{
    let loaderSpiner = document.getElementById('loader');
    if(isLoading){
        loaderSpiner.classList.remove('d-none')
    }else{
        loaderSpiner.classList.add('d-none')
    }
};