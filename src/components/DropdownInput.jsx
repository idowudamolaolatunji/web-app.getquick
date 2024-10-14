import React, { useEffect, useState } from 'react';
import { IoChevronDownSharp, IoChevronForwardSharp } from 'react-icons/io5';


function DropdownInput({ data, dataTitle, selected, setSelected }) {
    const [isOpen, setOpen] = useState(false);

    function toggleDropdown() {
        setOpen(!isOpen);
    }

    function handleItemClick(value) {
        selected == value ? setSelected(null) : setSelected(value);
        setOpen(false);
    }


    return (
        <div className='dropdown--input'>
            <div className='dropdown--input-head' onClick={toggleDropdown}>
                <p>{selected ? data.find(data => data.value == selected).label 
                : <span className='default'>Select {dataTitle}</span>}</p>
                {isOpen ? <IoChevronDownSharp /> : <IoChevronForwardSharp />}
            </div>


            <div className={`dropdown--input-body ${isOpen ? 'open' : ''}`}>
                {data.map(data => (
                    <div className={`dropdown--input-item ${data.value == selected ? 'selected' : ''}`} onClick={() => handleItemClick(data.value)} id={data.value} key={data.value}>
                        <span>{data.icon}</span>
                        {data.label}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DropdownInput