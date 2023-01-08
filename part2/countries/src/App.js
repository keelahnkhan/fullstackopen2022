import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import CountryView from "./components/CountryView";

import axios from "axios";

function App() {

  const [countries, setCountries] = useState([]);
  const [criteria, setCriteria] = useState('');

  const changeCriteria = (event) => {
    setCriteria(event.target.value);
  };

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data));
  });

  return (
    <div>
      <Filter criteria={criteria} changeCriteria={changeCriteria}/>
      <CountryView countries={countries} criteria={criteria}/>
    </div>
  );
}

export default App;
