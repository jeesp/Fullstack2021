import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const notification = props.notifications
  return (
    <>
   {
   notification !== null && <div style={style}>
      {notification}
    </div>
    }
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  }
}

const ConnectedNotifications = connect(mapStateToProps)(Notification)

export default ConnectedNotifications