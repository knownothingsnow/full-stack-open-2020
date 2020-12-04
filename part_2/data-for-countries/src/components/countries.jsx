import React, { useEffect, useState } from 'react'
import Weather from './weather'

function Countries ({ filteredCountries }) {
  const [areaOfShownCountry, setAreaOfShownCountry] = useState(0)

  const showCountries = area => {
    setAreaOfShownCountry(area)
  }

  useEffect(() => {
    if (areaOfShownCountry !== 0) document.querySelector(`#_${areaOfShownCountry}`).style.display = 'block'
  }, [areaOfShownCountry])

  if (filteredCountries.length < 10 && filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map(country => (
          <div key={country.area}>
            <h4>
              {country.name}&nbsp;&nbsp;
              <button onClick={() => showCountries(country.area)}>show</button>
            </h4>
            {/* CSS3 doesn't support ID selectors that start with a digit */}
            {/* https://stackoverflow.com/questions/37270787/uncaught-syntaxerror-failed-to-execute-queryselector-on-document */}
            <div id={`_${country.area}`} style={{ display: 'none' }}>
              <div>capital: {country.capital}</div>
              <div>population: {country.population}</div>
              <h5>languages</h5>
              <ul>
                {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
              </ul>
              <img src={country.flag} style={{ width: '10%' }} />
              <Weather country={country} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (filteredCountries.length > 10) return (<div>Too many matches, specify another filter</div>)

  return null
}

export default Countries
