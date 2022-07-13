import './css/styles.css';
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
