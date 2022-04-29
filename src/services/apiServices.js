export async function apiIngredient(ingredient) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(endpoint);
  const result = await response.json();
  console.log(result);
  return result;
}

export async function apiName(nome) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`;
  const response = await fetch(endpoint);
  const result = await response.json();
  return result;
}

export async function apiFirstLetter(firstLetter) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(endpoint);
  const result = await response.json();
  console.log(result);
  return result;
}
