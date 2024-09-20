import { createContext, useState, useEffect, useContext } from "react";


//////////////////////////////////////////////
//// CREATING CONTEXT ////
//////////////////////////////////////////////
const DataContext = createContext();
export default DataContext;


//////////////////////////////////////////////
//// CREATING PROVIDER ////
//////////////////////////////////////////////
export const DataProvider = ({ children }) => {
    const [isMenuClosed, setIsMenuClosed] = useState( JSON.parse(localStorage.getItem('menu')) || false );

    function handleMenuClose() {
        setIsMenuClosed(!isMenuClosed)
    }

    useEffect(function() {
        localStorage.setItem('menu', JSON.stringify(isMenuClosed));
    }, [isMenuClosed]);

 // CREATE CONTEXT DATA
    let contextData = {
        isMenuClosed,
        handleMenuClose,
    }


    return <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useDataContext = () => useContext(DataContext);