import React from 'react'
import Select from 'react-dropdown-select'

function MainDropdownSelect({ options, field, title, value, searchable = true, setValue }) {
    return (
        <div style={{ width: "100%", textTransform: "capitalize" }}>
            <Select
                className='form--select'
                options={options}
                labelField={field}
                valueField={field}
                searchBy={field}
                values={value}
                onChange={(values) => setValue(values)}
                searchable={searchable}
                separator
                clearable
                color='#ff7a49'
                placeholder={`Select ${title}`}
            />
        </div>
    )
}

export default MainDropdownSelect