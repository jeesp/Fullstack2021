const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    if (message )
    return (
      <div className="notification">
        {message}
      </div>
    )
  }
export default Notification