import React from 'react'
import Notification from './notification'
const personForm = ({
  submitName,
  newName,
  nameHandler,
  newNumber,
  numberHandler,
  successMessage
}) => {
  return (
    <>
      <Notification successMessage={successMessage} />
      <form onSubmit={submitName}>
        <div>name: <input value={newName} onChange={nameHandler} /></div>
        <div>number: <input value={newNumber} onChange={numberHandler} /></div>
        <div><button type='submit'>add</button></div>
      </form>
    </>
  )
}

export default personForm
