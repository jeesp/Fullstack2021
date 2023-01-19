import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const anecdotesWithAddedVote = state.map(anecdote => {
        if (anecdote.id === action.payload) {
          return {...anecdote, votes: anecdote.votes + 1}
        } else {
          return anecdote
        }
      })
      return anecdotesWithAddedVote.sort((a, b) => (a.votes < b.votes) ? 1 : -1)
    },
    addAnecdote(state, action) {
      const anecdote = action.payload
      state.push(anecdote)
      state.sort((a, b) => (a.votes < b.votes) ? 1 : -1)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createNewAnecdote = content => {
  return async dispatch => {
    const anecdote = asObject(content)
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(addAnecdote(newAnecdote))
  }
}
export const addVoteToAnecdote = content => {
  return async dispatch => {
    console.log(content)
    const anecdote = await anecdoteService.updateAnecdote({...content, votes: content.votes + 1})
    dispatch(voteAnecdote(anecdote.id))
  }
}

export default anecdoteSlice.reducer