//Задание  https://github.com/goitacademy/javascript-homework/tree/main/v2/10

import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchAPI';
const DEBOUNCE_DELAY = 500;

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const divEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));

function inputHandler(e) {
  queryName = e.target.value.trim();
  if (queryName === '') {
    return;
  }
  listEl.innerHTML = '';
  divEl.innerHTML = '';
  fetchCountries(queryName).then(render);
}

function render(data) {
  if (data.status === 404) {
    Notiflix.Notify.failure('ERROR 404', {
      clickToClose: true,
      pauseOnHover: true,
    });
    return;
  }
  if (data.length > 10) {
    Notiflix.Notify.failure(
      'Too many matches found. Please enter a more specific name.',
      { clickToClose: true, pauseOnHover: true }
    );
    return;
  }
  const { flags, name, capital, population, languages } = data[0];
  if (data.length === 1) {
    divEl.innerHTML = `
    <img src="${flags.svg}" width=125>
    <p class="country-name">${name.official}</p>
    <p>capital: ${capital}</p>
    <p>population: ${population.toLocaleString('de-DE')}</p>
    <p>languages: ${Object.values(languages).join(', ')}</p>
    `;
  } else {
    const listMarkup = data
      .map(({ flags, name }) => {
        return `<li>
      <img src="${flags.svg}" width=100>
      <p><b> ${name.official}</p></b>
      </li>`;
      })
      .join('');
    listEl.innerHTML = listMarkup;
  }
}
