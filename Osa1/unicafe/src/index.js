import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const StatisticLine = (props) => {
  return (
  <tr> 
  <td> {props.text}</td> 
  <td> {props.value} </td> 
  </tr>
  )
}
const Statistics = (props) => {
  if (props.all == 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.all} />
      <StatisticLine text="average" value={props.average} />
      <StatisticLine text="positive" value={props.positive} />
      </table>
    
    </div>
  )
}
const Button = (props) => {
  console.log(props)
  const {handleClick, text} = props
  return (
  <button onClick={handleClick}>
    {text}
  </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + bad + neutral
  const average = (good-bad)/all
  const positive = good/all + "%"
  
  
  return (
    <div>
      <h1> give feedback</h1>
      
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1> statistics</h1>
      <p></p>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
