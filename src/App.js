import React, { useEffect, useState } from "react";
import Recipe from "./recipe";
import "./App.css";

const App = () => {
  const APP_ID = "576e9bd7";
  const APP_KEY = "4276b81e532b0be8d075055972147a60";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("Pizza");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(query);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <div className="title">
        <div className="search-title"> ¡Search for a recipe! </div>{" "}
      </div>{" "}
      <form onSubmit={getSearch} action="" className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />{" "}
        <button className="search-button" type="submit">
          search{" "}
        </button>{" "}
      </form>{" "}
      <div className="recipes">
        {" "}
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.image}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}{" "}
      </div>{" "}
    </div>
  );
};

export default App;
