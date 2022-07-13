import './css/styles.css';
import {CountriesService} from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
    searchInput: document.querySelector("#search-box"),
    ulList: document.querySelector(".country-list"),
    divInfo: document.querySelector('.country-info'),
};
// Створюємо екземпляр класу CountriesService
const countriesService = new CountriesService();
// Додамо слухача на input
refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
// Функція отримання тексту введеного користувачем в input
function onSearch(event) {
    event.preventDefault();
    if (event.target.value.trim() === '') {
        clearPage();
        return
    };
    countriesService.searchInput = event.target.value.trim();
    countriesService.fetchCountries().then(data => renderMarkup(data)).catch(handleError);
}
// Функція для повідомлення користувачу про помилку
const handleError=()=>{
    Notify.failure('Oops, there is no country with that name')
}
// Функція, що створює розмітку для однієї країни
function markupOneCountry(data) {
    return data.map(country => {
        return `<img src="${country.flags.svg}" alt="Flag" width="30" height="24"></img>
                <h2 class="country-info-title">${country.name.official}</h2>
            <p>Capital: <span>${country.capital}</span></p><p>Population: <span>${country.population }</span></p><p>Languages: <span>${Object.values(country.languages)}</span></p>`
    }).join('');
}