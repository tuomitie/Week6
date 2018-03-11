import React from 'react'
import { createContent } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const anecdoteObject = this.asObject(content)
    console.log(anecdoteObject)
 //   const newAnecdote = this.props.createNew(anecdoteObject)
    this.props.createContent(anecdoteObject)
  }

  asObject = (anecdote) => {
    const idValue = (100000*Math.random()).toFixed(0)
    return {
      content: anecdote,
      id: idValue,
      votes: 0
    }
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { createContent }
)(AnecdoteForm)