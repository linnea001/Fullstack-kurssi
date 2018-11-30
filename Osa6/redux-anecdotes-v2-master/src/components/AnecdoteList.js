import React from 'react'
import { connect } from 'react-redux'
import { anecdoteVoting } from './../reducers/anecdoteReducer'
import { showMessage } from './../reducers/notificationReducer'
//import { reset } from './../reducers/notificationReducer'

const AnecdoteList = (props) => (

  <div>
    <h2>Anecdotes</h2>
    {props.visibleAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick = {async () => {
            //const beforeVoting = props.visibleAnecdotes.find(a => a.id ===anecdote.id)
            props.anecdoteVoting(anecdote)
            props.showMessage(`you voted: ${anecdote.content}`, 5)
          }
          }>
            vote
          </button>
        </div>
      </div>
    )}
  </div>
)

const aToShow = (anecdotes, filter) => {
  if (filter === '') {
    return anecdotes
  }
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
}


const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: aToShow(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  anecdoteVoting,
  showMessage
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)


export default ConnectedAnecdoteList