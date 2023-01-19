import { connect } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const createAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log('add anecdote', anecdote)
        props.createNewAnecdote(anecdote)
        props.setNotification(`you created '${anecdote}'`, 5)
    }
    return (
      <div>
        <h2>create new</h2>
      <form onSubmit={createAnecdote}>
      <input name="anecdote" />
      <button type="submit">create</button>
      </form>
      </div>
    )
  }
  
  const mapDispatchToProps = { createNewAnecdote, setNotification }

  const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
  
  export default ConnectedAnecdoteForm