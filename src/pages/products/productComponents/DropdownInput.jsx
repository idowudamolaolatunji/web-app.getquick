import React, { useEffect, useState } from 'react';
import { IoChevronDownSharp, IoChevronForwardSharp } from 'react-icons/io5';

const data = [{ id: 0, label: "Istanbul, TR (AHL)" }, { id: 1, label: "Paris, FR (CDG)" }];

function DropdownInput() {
    const [isOpen, setOpen] = useState(false);
    const [collections, setCollections] = useState(data);
    const [selectedCollection, setSelectedCollection] = useState(null);
    // const []name description image

    const toggleDropdown = () => setOpen(!isOpen);

    const handleItemClick = (id) => {
        selectedCollection == id ? setSelectedCollection(null) : setSelectedCollection(id);
        setOpen(false)
    }

    async function handleFetchCollection() {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/products/get-collections`);
        const data = await res.json();
        setCollections(data.data.collections)
    }

    useEffect(function() {
        handleFetchCollection()
    },  [])

    return (
        <div className='dropdown--input'>
            <div className='dropdown--input-head' onClick={toggleDropdown}>
                <p>{selectedCollection ? collections.find(collection => collection.id == selectedCollection).label : <span className='default'>Select your Collection</span>}</p>
                {isOpen ? <IoChevronDownSharp /> : <IoChevronForwardSharp />}
            </div>


            <div className={`dropdown--input-body ${isOpen ? 'open' : ''}`}>
                {collections.map(collection => (
                    <div className="dropdown--input-item" onClick={e => handleItemClick(e.target.id)} id={collection.id}>
                        <span className={`dropdown--input-item-dot ${collection.id == selectedCollection ? 'selected' : ''}`}>• </span>
                        {collection.label}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DropdownInput