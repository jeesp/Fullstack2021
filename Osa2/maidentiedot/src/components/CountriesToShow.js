import React from 'react'
import Country from './Country'

const CountriesToShow = ({countriesFiltered, filter, setFilter}) => {

    if (filter === '' && (countriesFiltered.length < 1 | countriesFiltered.length > 10)) {
      return <p></p>
    }
    if (countriesFiltered.length < 1) {
      return <p>No Countries</p>
    }
    if (countriesFiltered.length === 1) {
      return  (<div>{countriesFiltered.map(country => <Country key={country.name} country = {country} />)} </div>
      )
    }
    if (countriesFiltered.length > 1 && countriesFiltered.length < 10) {
      return (<div> {countriesFiltered.map(country => <p> {country.name} <button onClick={()=> {setFilter(country.name)}}>More</button></p>)} </div>
      )
    }
    if (countriesFiltered.length > 10) {
      return <p> Too many matches, specify another filter</p>
    }
  }

export default CountriesToShow