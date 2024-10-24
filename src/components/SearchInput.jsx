import React, { useState } from 'react'

function SearchInput() {
  const [value, setValue] = useState("")
  return (
    <input type="search" value={value} onChange={e => setValue(e.target.value)} className="table--input form--input" placeholder='search..' />
  )
}

export default SearchInput