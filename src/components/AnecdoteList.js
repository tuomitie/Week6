import React from 'react'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

    handleVote = (anecdote) => {
      this.props.voteFor(anecdote)
      this.props.setNotification({ text: `voted for ${anecdote.content}` })
      setTimeout(
        () => this.props.clearNotification(),
        5000
      )
    }

    render() {
      return (
        <div>
          <h2>Anecdotes</h2>
          {this.props.anecdotesToShow.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
              has {anecdote.votes}
                <button onClick={() => this.handleVote(anecdote) }>
                vote
                </button>
              </div>
            </div>
          )}
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state.anecdotes, state.filter),
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  anecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapDispatchToProps = {
  voteFor, setNotification, clearNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList