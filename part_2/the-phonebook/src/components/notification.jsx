const Notification = ({ message }) => {
  if (message.type === '') return null

  if (message.type === 'success') {
    return (
      <div className='message success'>{message.content}</div>
    )
  }

  if (message.type === 'error') {
    return (
      <div className='message error'>{message.content}</div>
    )
  }
}

export default Notification
