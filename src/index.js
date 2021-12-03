import './css/styles.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import RestCountriesAPI from "./additional/js/fetchCountries";
import { debounce } from 'lodash';
export { general };

const DEBOUNCE_DELAY = 300;
const general = {
  searchBox: document.querySelector("input#search-box"),
  countryList: document.querySelector(".country-list"),
  countryInfo: document.querySelector(".country-info"),
};
let name = '';
const restCountriesAPI = new RestCountriesAPI();

general.searchBox.addEventListener("input",
  debounce(onSearch, DEBOUNCE_DELAY, { trailing: true }));

function onSearch(e) {
  e.preventDefault();
  name = e.path[0].value.trim();
  general.countryInfo.innerHTML = '';
  general.countryList.innerHTML = '';

  if (name !== "") {
    restCountriesAPI.name = name;
    restCountriesAPI.fetchCountries(name).then(countryGetInfo => {
      renderCountryInfo(countryGetInfo);
    });
  }
};

function renderCountryInfo(countryGetInfo) {
    for (const key in countryGetInfo) {
        if (Object.hasOwnProperty.call(countryGetInfo, key)) {
            const element = countryGetInfo[key];
            console.log(element);
            console.log(countryGetInfo);

            const { name, capital, population, flags, languages }
                = element;
            console.log(countryGetInfo.length);

            if (countryGetInfo.length > 1 && countryGetInfo.length < 10) {
                general.countryInfo.innerHTML = '';
                general.countryList.innerHTML = '';
                return AddCountryList(countryGetInfo);
            }

            if (countryGetInfo.length === 1) {
                general.countryInfo.innerHTML = '';
                general.countryList.innerHTML = '';
                return AddCountryList(countryGetInfo);
            };

            if (countryGetInfo.length > 10) {
                general.countryInfo.innerHTML = '';
                general.countryList.innerHTML = '';
            }

            // about country
    function AddCountryFullInfo(countryGetInfo) {
        return refs.countryInfo.insertAdjacentHTML("beforeend", `<div class="flag-country-block">
        <img
          class="flag"
          src="${flags.svg}"
          alt="flag"
        />
        <h1>${name.official}</h1>
      </div>
      <ul class="country-info-details">
        <li class="country-info-item">
          <h2>Capital:</h2>
          <span class="info-value">${capital}</span>
        </li>
        <li class="country-info-item">
          <h2>Population:</h2>
          <span class="info-value">${population}</span
          >
        </li>
        <li class="country-info-item">
          <h2>Languages:</h2>
          <span class="info-value">${Object.values(languages)}</span
          >
        </li>
      </ul>`);
    }
    }
  };
};

function AddCountryList(countryGetInfo) {
  const markup = countryGetInfo.map((item) => {
    console.log(item);

    return `<li class="country-list-item">
        <img
          class="flag-list"
          src="${item.flags.svg}"
          alt="flag"
          />
        <h2 class="list-item-h2">${item.name.official}</h2>
      </li>`
  }).join("");

  general.countryList.insertAdjacentHTML("beforeend", markup);
};