import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {

    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    const notification = this.props.notification
    console.log(this.props)
    if (notification === '[object Object]') {
      return (
        null
      )
    }

    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

const connNotification = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(
  connNotification
)(Notification)

export default ConnectedNotification