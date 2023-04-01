import './css/styles.css';

const DEBOUNCE_DELAY = 300;

async function fetchCountries() {
  fetch('https://restcountries.com/v3.1/name/deutschland');
  const response = await fetchCountries();
  const data = await response.json();
  console.log('🚀 ~ file: index.js:11 ~ data:', data);
}

fetchCountries();
