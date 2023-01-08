const Country = ({country, weather}) => {
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
      {weather && 
        <div>
          <h2>Weather in {country.capital[0]}</h2>
          <p>Temperate {weather.main.temp} Celsius</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
          <p>Wind {weather.wind.speed} m/s</p>
        </div>
      }
    </div> 
  );
}

export default Country;