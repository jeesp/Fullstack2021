import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import CountriesToShow from './components/CountriesToShow'
import axios from 'axios'

const App =() => {
  const [countries, setCountries] = useState([])
  const [ filter, setFilter ] = useState('')
  const hook = () => {
  console.log('effect')
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  }
  useEffect(hook, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  const countriesFiltered  = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <div>
      <Filter onChange={handleFilterChange}/>
      <CountriesToShow countriesFiltered={countriesFiltered} filter={filter} setFilter={setFilter} />
    </div>
  );
}

export default App;
