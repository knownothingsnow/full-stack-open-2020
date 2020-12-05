import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/countries'
import './App.css'

function App () {
  const [countryName, setCountryName] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  const nameHandler = (e) => {
    const name = e.target.value
    setCountryName(name)
    setFilteredCountries(countries.filter(country => new RegExp(`${name}`, 'ig').test(country.name)))
  }

  useEffect(() => {
    const api = 'https://restcountries.eu/rest/v2/all'
    axios.get(api).then(res => { setCountries(res.data) })
  }, [])

  return (
    <div>
      <form>
        <div>filter countries <input type='text' id='search' value={countryName} onChange={nameHandler} /></div>
      </form>
      <Countries filteredCountries={filteredCountries} />
    </div>
  )
}

export default App
