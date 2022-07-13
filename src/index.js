import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputBox = document.querySelector('#search-box');
console.log(inputBox);
const countryList = document.querySelector('.country-list');
console.log(countryList);
