import React from 'react'
import PropTypes from 'prop-types'
import { filterContent } from '../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
  handleChange = (event) => {
    event.preventDefault
    this.props.filterContent(event.target.value)
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

const mapDispatchToProps = {
  filterContent
}

const ConnectedFilter = connect(
  connFilter,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter