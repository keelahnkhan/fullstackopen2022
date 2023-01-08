import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import CountryTable from "./components/CountryTable";

import axios from "axios";
import Country from "./components/Country";

function App() {

  const [countries, setCountries] = useState([]);
  const [criteria, setCriteria] = useState('');
  const [country, setCountry] = useState('');
  const [weather, setWeather] = useState('');

  const changeCriteria = (event) => {
    setCountry('');
    setCriteria(event.target.value);
  };

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data));
  }, []);

  useEffect(() => {
    console.log("effect call");
    if (country) {
      console.log("country set, getting weather...");
      axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
        .then(response => setWeather(response.data));
    }
  }, [country]);

  const filteredCountries = countries.filter((country) => 
    country.name.common.includes(criteria)
  );

  if (!country && filteredCountries.length === 1) setCountry(filteredCountries[0]);

  return (
    <div>
      <Filter criteria={criteria} changeCriteria={changeCriteria}/>
      {country 
        ? <Country country={country} weather={weather}/>
        : <CountryTable countries={filteredCountries} setCountry={setCountry}/>}
      
    </div>
  );
}

export default App;
