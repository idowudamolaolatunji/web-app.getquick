import React, { useEffect, useState } from 'react';
import { IoChevronDownSharp, IoChevronForwardSharp } from 'react-icons/io5';

const dataArr = [{ id: 0, label: "Istanbul, TR (AHL)" }, { id: 1, label: "Paris, FR (CDG)" }];

function DropdownInput({ data=dataArr, dataTitle, selected, setSelected }) {
    const [isOpen, setOpen] = useState(false);

    const toggleDropdown = function() {
        setOpen(!isOpen);
    }

    const handleItemClick = function(id) {
        selected == id ? setSelected(null) : setSelected(id);
        setOpen(false);
    }


    return (
        <div className='dropdown--input'>
            <div className='dropdown--input-head' onClick={toggleDropdown}>
                <p>{selected ? data.find(data => data.id == selected).label 
                : <span className='default'>Select {dataTitle}</span>}</p>
                {isOpen ? <IoChevronDownSharp /> : <IoChevronForwardSharp />}
            </div>


            <div className={`dropdown--input-body ${isOpen ? 'open' : ''}`}>
                {data.map(data => (
                    <div className="dropdown--input-item" onClick={e => handleItemClick(e.target.id)} id={data.id}>
                        <span className={`dropdown--input-item-dot ${data.id == selected ? 'selected' : ''}`}>• </span>
                        {data.label}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DropdownInput