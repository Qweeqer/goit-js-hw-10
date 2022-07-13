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
    // countriesService.fetchCountries().then(data => renderMarkup(data)).catch(handleError);
}