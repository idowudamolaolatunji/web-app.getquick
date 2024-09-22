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
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(function() {
        return localStorage.getItem('menu') ? JSON.parse(localStorage.getItem('menu')) : false 
    });
    const [showSidemenu, setShowSidemenu] = useState(false);

    function handleMenuCollapse() {
        setIsMenuCollapsed(!isMenuCollapsed);
    }

    function handleShowSidemenu() {
        setShowSidemenu(!showSidemenu);
    }

    useEffect(function() {
        localStorage.setItem('menu', JSON.stringify(isMenuCollapsed));
    }, [isMenuCollapsed]);

    // CREATE CONTEXT DATA
    let contextData = {
        isMenuCollapsed,
        handleMenuCollapse,

        showSidemenu,
        handleShowSidemenu
    }


    return <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useDataContext = () => useContext(DataContext);