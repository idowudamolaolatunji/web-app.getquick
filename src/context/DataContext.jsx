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

    const [activeDisplayTab, setActiveDisplayTab] = useState(localStorage.getItem("p_active_tab") ? JSON.parse(localStorage.getItem("p_active_tab")) : "table");

    const [showInsights, setShowInsights] = useState(
        localStorage.getItem("show_ins") ? JSON.parse(localStorage.getItem("show_ins")) : {
        product: false,
        order: false,
        customer: false,
    });

    const { pathname } = useLocation();
    const { width } = useWindowSize();

    const handleDisplayTab = function(type) {
        setActiveDisplayTab(type)
    }

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


    function handleToggleInsights(name) {
        setShowInsights({
            ...showInsights,
            [name]: !showInsights[name]
        })
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

    useEffect(function() {
        localStorage.setItem("show_ins", JSON.stringify(showInsights))
    }, [showInsights]);

    useEffect(function() {
        localStorage.setItem("p_active_tab", JSON.stringify(activeDisplayTab))
    }, [activeDisplayTab]);

    

    // CREATE CONTEXT DATA
    let contextData = {
        isMenuCollapsed,
        handleMenuCollapse,

        showSidemenu,
        setShowSidemenu,
        handleShowSidemenu,
        animateOut,

        handleToggleInsights,
        showInsights,

        activeDisplayTab,
        handleDisplayTab,
    }


    return <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useDataContext = () => useContext(DataContext);