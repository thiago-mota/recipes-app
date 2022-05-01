export async function apiIngredient(ingredient) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(endpoint);
  const result = await response.json();
  return result.meals;
}

export async function apiName(nome) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`;
  const response = await fetch(endpoint);
  const result = await response.json();
  return result.meals;
}

export async function apiFirstLetter(firstLetter) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(endpoint);
  const result = await response.json();
  return result.meals;
}

export async function apiMealCategories() {
  const nOfCategories = 5;
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endpoint);
  const result = await response.json();
  const slicedArray = result.meals.slice(0, nOfCategories);
  return slicedArray;
}

export async function apiMealsByCategory(category) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(endpoint);
  const result = await response.json();
  return result.meals;
}
