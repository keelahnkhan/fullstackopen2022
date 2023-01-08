const Country = ({country}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.keys(country.languages).map((key) => 
          <li key={key}>{country.languages[key]}</li>)}
      </ul>
      <img src={country.flags.png}/>
    </div> 
  );
}

const CountryView = ({criteria, countries}) => {

  const filteredCountries = countries.filter((country) => 
    country.name.common.includes(criteria)
  );

  return (
    <div>
      {filteredCountries.length > 10 
        ? <p>Too many matches, specify another filter</p>
        : filteredCountries.length === 1
          ? <Country country={filteredCountries[0]}/>
          : filteredCountries.map((country) => <p key={country.ccn3}>{country.name.common}</p>)
      }
    </div>
  );
}

export default CountryView;