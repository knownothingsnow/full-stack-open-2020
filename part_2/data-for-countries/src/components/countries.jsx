import React from 'react'

function Countries({ filteredCountries }) {
  if (filteredCountries.length < 10 && filteredCountries.length > 1) {
    return (
      <>
        {
          filteredCountries.map((country) => <div key={country.numericCode}>{country.name}</div>)
        }
      </>
    )
  }
 
  if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    return (
      <>
        <h3>capital: {country.name}</h3>
        <div>capital: {country.capital}</div>
        <div>population: {country.population}</div>
        <div>
          <h3>languages</h3>
          <ul>
            {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
          </ul>
        </div>
      </>
    )
  }

  if (filteredCountries.length > 10) return (<div>Too many matches, specify another filter</div>)

  return null
}

export default Countries