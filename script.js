let countriesData = [];

const fetchCountriesDataFromAPI = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    countriesData = data;
  }

const countryList = document.querySelector('#all-countries');
function populateCountryList(countriesData) {
  countryList.textContent = '';
  countriesData.forEach(countryData => {
    const country = createCountry(countryData);
    countryList.appendChild(country);
  });

}
  async function setUp() {
    await fetchCountriesDataFromAPI();
    populateCountryList(countriesData);
  }

  const createCountry = countryData => {
    const list = document.createElement('li');
    const countryName = countryData.name.common;
    const countryPopulation = countryData.population;
    list.textContent = `${countryName} has a population of: ${countryPopulation}`;
    return list
  };
  
function filterCountries(query) {
  const filteredCountries = countriesData.filter(countryData => 
    countryData.name.common.toLowerCase().includes(query.toLowerCase())
  );
  populateCountryList(filteredCountries);
}
const Input = document.querySelector('#input');
const handleSubmit = document.querySelector('#filter-form');
handleSubmit.addEventListener('submit', function (event) {
  event.preventDefault();
  const searchTerm = Input.value;
  filterCountries(searchTerm);
});

setUp();
