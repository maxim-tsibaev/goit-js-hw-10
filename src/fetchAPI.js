const BASE_URL = 'https://restcountries.com/v3.1/name';
const FIELDS = 'name,capital,population,flags,languages';

export async function fetchCountries(name) {
  const response = await fetch(`${BASE_URL}/${name}?fields=${FIELDS}`);
  const data = await response.json();
  console.log('data: ', data);
  return data;
}
