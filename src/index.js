import './css/styles.css';
import {CountriesService} from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
    searchInput: document.querySelector("#search-box"),
    countryList: document.querySelector(".country-list"),
    countryInfo: document.querySelector('.country-info'),
};
// Створюємо екземпляр класу CountriesService
const countriesService = new CountriesService();
// Додамо слухача на input
refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
// Функція отримання тексту введеного користувачем в input
function onSearch(event) {
    let { value } = event.target;
    value = value.trim()
    event.preventDefault();
    if (value === '') {
        clearPage();
        return
    };
    countriesService.searchInput = value;
    countriesService.fetchCountries().then(data => renderMarkup(data)).catch(handleError);
}
// Функція для повідомлення користувачу про помилку
const handleError=()=>{
    Notify.failure('Oops, there is no country with that name')
}
// Функція, що створює розмітку для однієї країни
function markupOneCountry(data) {
    return data.map(({flags, name, capital, population, languages }) => {
        return `<img src="${flags.svg}"
        alt="Flag" 
        width="200" 
        height="100"></img>
        <h2 class="country-info-title">${name.official}</h2>
        <p>Capital: <span>${capital}</span></p>
        <p>Population: <span>${population}</span></p>
        <p>Languages: <span>${Object.values(languages)}</span></p>`
    }).join('');
}
// Функція створює розмітку для 2-10 країн
function markupMoreCountries(data) {
    return data.map(({flags, name}) => {
        return `<li class="country-list-item">
        <img src="${flags.svg}" 
        alt="Flag" 
        width="20" 
        height="16">
        </img>${name.official}</li>`
    }).join('');
}
// Функція, яка рендерить розмітку в залежності від кількості отриманих країн
function renderMarkup(data) {
    clearPage();
    if (data.length === 1) {
        refs.countryInfo.insertAdjacentHTML('beforeend', markupOneCountry(data)) 
    }
    if (data.length > 1 && data.length <= 10) {
        refs.countryList.insertAdjacentHTML('beforeend', markupMoreCountries(data))
    }
    if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.')
    }
}
// Функція для очищення розмітки
function clearPage() {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
}




// -------------------Чернетка-----7----2

// const searchInputRef = document.querySelector('.search-input');
// const errorTextRef = document.querySelector('.output-error');
// const listRef = document.querySelector('.country-card');

// const handleInput = event => {
//   let { value } = event.target;

//   value = value.trim().toLowerCase();

//   if (value === '') {
//     errorTextRef.textContent = '';
//     listRef.innerHTML = '';
//     return;
//   }

//   const countryInfo = countries.filter(({ name }) => name.toLowerCase().includes(value));

//   if (countryInfo.length > 1) {
//     const listMarkup = createCountryList(countryInfo).join('');
//     listRef.innerHTML = listMarkup;
//     errorTextRef.textContent = '';
//   }

//   if (countryInfo.length === 1) {
//     const listMarkup = createCountryCard(countryInfo[0]);
//     listRef.innerHTML = listMarkup;
//     errorTextRef.textContent = '';
//   }

//   if (countryInfo.length === 0) {
//     listRef.innerHTML = '';
//     errorTextRef.textContent = `Countri ${value} not found!`;
//   }
// -------------------------------------------------
  // const countryInfo = countries.find(country => country.name === value.trim());

  // if (!countryInfo) {
  //   errorTextRef.textContent = `Countri ${value} not found!`;
  //   listRef.innerHTML = '';
  // }

  // if (countryInfo) {
  //   errorTextRef.textContent = '';
  //   listRef.innerHTML = createCountryCard(countryInfo);
  // }
//------------------------------------------------------------------
    
// };
// const debouncedHandleInput = _.debounce(handleInput, 300);
// searchInputRef.addEventListener('input', debouncedHandleInput);

// const createCountryList = counrtiesList => {
//   return counrtiesList.map(({ name, capital }) => {
//     return `<li>
//   <h5> Country name: ${name}</h5>
//   <p>Country capital: ${capital}</p>
//   </li>`;
//   });
// };

// const createCountryCard = ({ name, capital, area, population }) => {
//   return `<li>
//   <h3> Country name: ${name}</h3>
//   <p>Country capital: ${capital}</p>
//   <p>population: ${population}</p>
//   <p>area: ${area}</p>
//   </li>`;
// };