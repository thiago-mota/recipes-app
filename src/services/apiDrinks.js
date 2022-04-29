export async function apiDrinkIngredient(ingredient) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(endpoint);
  const result = await response.json();
  console.log(result);
  return result;
}

export async function apiDrinkName(nome) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`;
  const response = await fetch(endpoint);
  const result = await response.json();
  // console.log(result);
  return result;
}

export async function apiDrinkFirstL(firstLetter) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(endpoint);
  const result = await response.json();
  // console.log(result);
  return result;
}
