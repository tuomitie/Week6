import React from 'react'
import PropTypes from 'prop-types'
import { filterContent } from '../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleChange = (event) => {
    event.preventDefault
    this.context.store.dispatch(filterContent(event.target.value))
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

const connFilter = (state) => {
  return {
    filter: state.filter
  }
}

Filter.contextTypes = {
  store: PropTypes.object
}

const ConnectedFilter = connect(
  connFilter
)(Filter)

export default ConnectedFilter