import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  if (action.type === 'VOTE') {
    const unchanged = store.filter(a => a.id !==action.data.id)
    return [...unchanged, action.data]
  }
  if (action.type === 'CREATE') {
    //return [...store, { content: action.data.content, id: getId(), votes:0 }]
    return [...store, action.data]
  }
  if (action.type === 'INIT_ANECDOTES') {
    return action.data
  }

  return store
}



// action creators
export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch ({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}


export const anecdoteVoting = (beforeVoting) => {
  return async (dispatch) => {
    const id = beforeVoting.id
    const afterVoting = { ...beforeVoting, votes: beforeVoting.votes + 1 }
    const updatedAnecdote = await anecdoteService.update(id, afterVoting)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}


export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer