import React from 'react'
import Select from 'react-dropdown-select'

function MainDropdownSelect({ options, multiple=false, field, title, value, searchable = true, setValue, noDataLabel="No Data", disabled=false }) {
    return (
        <div style={{ width: "100%", textTransform: "capitalize" }}>
            <Select
                disabled={disabled}
                multi={multiple}
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
                noDataLabel={noDataLabel}
            />
        </div>
    )
}

export default MainDropdownSelect