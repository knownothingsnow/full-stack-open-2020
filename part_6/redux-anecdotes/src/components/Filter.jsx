import React from 'react'
import { setFilter } from '../reducers/filterReducer.js'
import { connect } from 'react-redux'

const Filter = (props) => {
  const handleChange = (event) => {
    props.setFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input value={ props.filter} onChange={handleChange} />
    </div>
  )
}

export default connect(
  state => ({filter:state.filter}),
  { setFilter }
)(Filter)