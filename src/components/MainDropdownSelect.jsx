import React, { useState } from 'react'
import Select from 'react-dropdown-select'

function MainDropdownSelect({ options, field, title, value, setValue }) {

    return (
        <div style={{ width: "100%", textTransform: "capitalize" }}>
            <Select
                className='form--select'
                options={options}
                labelField={field}
                valueField={field}
                values={value}
                onChange={(values) => setValue(values)}
                separator
                clearable
                color='#ff7a49'
                placeholder={`Select ${title}`}
            />
        </div>
    )
}

export default MainDropdownSelect