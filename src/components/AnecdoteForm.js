import React from 'react'
import { createContent } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    this.props.createContent(content)
    event.target.anecdote.value = ''
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