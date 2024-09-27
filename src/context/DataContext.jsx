import { createContext, useState, useEffect, useContext } from "react";
import { useLocation, useWindowSize } from "react-use";


//////////////////////////////////////////////
//// CREATING CONTEXT ////
//////////////////////////////////////////////
const DataContext = createContext();
export default DataContext;


//////////////////////////////////////////////
//// CREATING PROVIDER ////
//////////////////////////////////////////////
export const DataProvider = ({ children }) => {
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(localStorage.getItem('menu') ? JSON.parse(localStorage.getItem('menu')) : false);
    const [showSidemenu, setShowSidemenu] = useState(false);

    const storedDarkMode = localStorage.getItem('isDarkMode');
    const [isDarkMode, setIsDarkMode] = useState(storedDarkMode ? JSON.parse(storedDarkMode) : false);
    const [animateOut, setAnimateOut] = useState(false);

    const { pathname } = useLocation();
    const { width } = useWindowSize();


    function handleMenuCollapse() {
        setIsMenuCollapsed(!isMenuCollapsed);
    }

    function closeNanimate() {
        setAnimateOut(true);
        setTimeout(() => {
            setAnimateOut(false);
            setShowSidemenu(false);
        }, 300);
    }

    function handleShowSidemenu() {
        if(!showSidemenu) {
            setShowSidemenu(true);
        } else {
            closeNanimate();
        }
    }

    function onMode() {
        setIsDarkMode(!isDarkMode);
    }

    useEffect(function() {
        console.log(width);
        if(width <= 1100) {
            setIsMenuCollapsed(true);
        }
    }, [width]);

    useEffect(function() {
        closeNanimate();
    }, [pathname]);

    useEffect(function() {
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));

        if(isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    useEffect(function() {
        localStorage.setItem('menu', JSON.stringify(isMenuCollapsed));
    }, [isMenuCollapsed]);

    // CREATE CONTEXT DATA
    let contextData = {
        isMenuCollapsed,
        handleMenuCollapse,

        showSidemenu,
        setShowSidemenu,
        handleShowSidemenu,
        animateOut,

        onMode,
        isDarkMode,
    }


    return <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useDataContext = () => useContext(DataContext);