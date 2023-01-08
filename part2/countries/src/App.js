import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import CountryTable from "./components/CountryTable";

import axios from "axios";
import Country from "./components/Country";

function App() {

  const [countries, setCountries] = useState([]);
  const [criteria, setCriteria] = useState('');
  const [country, setCountry] = useState('');

  const changeCriteria = (event) => {
    setCountry('');
    setCriteria(event.target.value);
  };

  useEffect(() => {
    console.log("effect");
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data));
  }, []);

  const filteredCountries = countries.filter((country) => 
    country.name.common.includes(criteria)
  );

  if (!country && filteredCountries.length === 1) setCountry(filteredCountries[0]);

  return (
    <div>
      <Filter criteria={criteria} changeCriteria={changeCriteria}/>
      {country 
        ? <Country country={country}/>
        : <CountryTable countries={filteredCountries} setCountry={setCountry}/>}
      
    </div>
  );
}

export default App;
