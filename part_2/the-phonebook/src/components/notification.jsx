const Notification = ({ successMessage }) => {
  if (successMessage === '') return null

  return (
    <div className='error'>
      {successMessage}
    </div>
  )
}

export default Notification
