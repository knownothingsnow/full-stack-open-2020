import React from 'react'

const personForm = ({
  submitName,
  newName,
  nameHandler,
  newNumber,
  numberHandler
}) => {
  return (
    <form onSubmit={submitName}>
      <div>name: <input value={newName} onChange={nameHandler} /></div>
      <div>number: <input value={newNumber} onChange={numberHandler} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}


export default personForm