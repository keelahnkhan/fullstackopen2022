const CountryTable = ({countries, setCountry}) => {
  return (
    <div>
      {countries.length > 10 
        ? <p>Too many matches, specify another filter</p>
        : countries.map((country) =>
          <p key={country.ccn3}>
            {country.name.common}<button onClick={() => setCountry(country)}>Show</button>
          </p>
        )
      }
    </div>
  );
}

export default CountryTable;