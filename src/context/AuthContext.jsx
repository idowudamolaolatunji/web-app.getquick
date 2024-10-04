import { createContext, useState, useEffect, useContext } from "react";
import Cookies from 'js-cookie';

//////////////////////////////////////////////
//// CREATING CONTEXT ////
//////////////////////////////////////////////
const AuthContext = createContext();
export default AuthContext;


//////////////////////////////////////////////
//// CREATING PROVIDER ////
//////////////////////////////////////////////
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(Cookies.get('q_user_obj') ? JSON.parse(Cookies.get('q_user_obj')) : null);
    const [token, setToken] = useState(Cookies.get('q_user_jwt_token') ? Cookies.get('q_user_jwt_token') : null);
    const [store, setStore] = useState(Cookies.get("q_user_store") ? JSON.parse(Cookies.get("q_user_store")) : null);
    const [isNewCustomer, setIsNewCustomer] = useState(true);


    function handleChange(user, token) {
		setUser(user);
		setToken(token);
	};

	function handleUser(user) {
		setUser(user);
	};

    function handleStore(store) {
        setStore(store);
    }

    async function signoutUser() {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/logout`);
            if(!res.ok) throw new Error('Check internet connection');
            
            handleChange(null, null);
            handleStore(null);
        } catch(err) {
            console.log(err.message);
        }
    }


    useEffect(function() {
        Cookies.set("q_user_obj", JSON.stringify(user), { expires: 365 });
		Cookies.set("q_user_jwt_token", token, { expires: 365 });
        Cookies.set("q_user_store", JSON.stringify(store), { expires: 365 });
    }, [user, token, store]);

 // CREATE CONTEXT DATA
    let contextData = {
        user,
        token,
        handleChange,
        handleUser,
        signoutUser,

        store,
        handleStore,

        isNewCustomer,
        setIsNewCustomer
    }


    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useAuthContext = () => useContext(AuthContext);