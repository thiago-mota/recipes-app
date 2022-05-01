export async function apiDrinkIngredient(ingredient) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(endpoint);
  console.log(response);

  const result = await response.json();
  console.log(result);
  return result;
}

export async function apiDrinkName(nome) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`;
  const response = await fetch(endpoint);
  const result = await response.json();
  return result;
}

export async function apiDrinkFirstL(firstLetter) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(endpoint);
  const result = await response.json();
  return result;
}

export async function apiDrinkCategories() {
  const nOfCategories = 5;
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endpoint);
  const result = await response.json();
  const slicedArray = result.drinks.slice(0, nOfCategories);
  return slicedArray;
}

export async function apiDrinksByCategory(category) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(endpoint);
  const result = await response.json();
  return result.drinks;
}
