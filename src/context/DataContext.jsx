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
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(localStorage.getItem("menu_collapsed") ? JSON.parse(localStorage.getItem("menu_collapsed")) : false);
    const [showSidemenu, setShowSidemenu] = useState(false);
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


    useEffect(function() {
        if(width <= 1100) {
            setIsMenuCollapsed(true);
        } else {
            setIsMenuCollapsed(false);
        }
    }, [width]);


    useEffect(function() {
        closeNanimate();
    }, [pathname]);


    useEffect(function() {
        localStorage.setItem("menu_collapsed", JSON.stringify(isMenuCollapsed));
    }, [isMenuCollapsed]);

    // CREATE CONTEXT DATA
    let contextData = {
        isMenuCollapsed,
        handleMenuCollapse,

        showSidemenu,
        setShowSidemenu,
        handleShowSidemenu,
        animateOut,

    }


    return <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useDataContext = () => useContext(DataContext);