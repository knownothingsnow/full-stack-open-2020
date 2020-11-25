import React from 'react'

const filter = ({
  persons,
  setPersonsToShow,
  searcher,
  setSearcher
}) => {


  const searcherHandler = (e) => {
    const newSearcher = e.target.value
    setSearcher(newSearcher)
    const isSercherEmpty = !Boolean(newSearcher)
    const newPersonsToShow = isSercherEmpty
      ? persons
      : persons.filter(person => new RegExp(`${newSearcher}`, 'ig').test(person.name))

    setPersonsToShow(newPersonsToShow)
  }

  return (
    <div>filter shown with: <input value={searcher} onChange={searcherHandler} /></div>
  )
}

export default filter