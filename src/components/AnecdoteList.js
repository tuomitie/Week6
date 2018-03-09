import React from 'react'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

    handleVote = (anecdote) => {
      this.context.store.dispatch(voteFor(anecdote))
      this.context.store.dispatch(setNotification({ text: `voted for ${anecdote.content}` }))
      setTimeout(
        () => this.context.store.dispatch(clearNotification()),
        5000
      )
    }

    render() {
      const anecdotes =
        (this.props.filter === {}) ?
          this.props.anecdotesToShow :
          this.props.anecdotesToShow.filter(anecdote => anecdote.content.toLowerCase().includes(this.props.filter.toLowerCase()))

      console.log(anecdotes)

      return (
        <div>
          <h2>Anecdotes</h2>
          {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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
    anecdotesToShow: state.anecdotes,
    filter: state.filter
  }
}

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

const ConnectedAnecdoteList = connect(
  mapStateToProps
)(AnecdoteList)

export default ConnectedAnecdoteList