import React, { useState, useEffect } from 'react'
import { useDataContext } from '../../../context/DataContext';
import MainDropdownSelect from '../../../components/MainDropdownSelect';

function CreateCustomers() {
    const { location, getContries, getStates, getCities, setLocation } = useDataContext();

    const [country, setCountry] = useState([]);
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);

    function handleClearLocation() {
        setState([]);
        setCity([]);
        setLocation({ ...location, state: [], city: [] })
    }

    useEffect(function () {
        handleClearLocation()
        getContries()
    }, []);


    useEffect(function () {
        handleClearLocation();

        if (country.length > 0) {
            getStates(country[0]?.iso2)
        }
    }, [country[0]]);


    useEffect(function () {
        setCity([]);
        setLocation({ ...location, city: [] });

        if (country.length > 0 && state.length > 0) {
            getCities(country[0]?.iso2, state[0]?.iso2);
        }
    }, [country[0], state[0]]);


    return (
        <div>
            <MainDropdownSelect title="a Country" options={location?.country} field="name" value={country} setValue={setCountry} clearOnSelect={true} />

            <MainDropdownSelect title="a state" options={location?.state} field="name" value={state} setValue={setState} noDataLabel='No states' clearOnSelect={true} disabled={country?.length < 1} />

            <MainDropdownSelect title="a city" options={location?.city} field="name" value={city} setValue={setCity} noDataLabel='No Cities' clearOnSelect={true} disabled={state?.length < 1} />
        </div>
    )
}

export default CreateCustomers