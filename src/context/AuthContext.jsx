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
    const [bank, setBank] = useState(Cookies.get("q_user_bank") ? JSON.parse(Cookies.get("q_user_bank")) : null);

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

    function handleBank(bank) {
        setBank(bank)
    }

    async function signoutUser() {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/users/logout`);
            if (!res.ok) throw new Error('Check internet connection');

            handleChange(null, null);
            Cookies.remove("q_user_obj");
            Cookies.remove("q_user_jwt_token");
            Cookies.remove("q_user_store");
            Cookies.remove("q_user_bank");
        } catch (err) {
            console.log(err.message);
        }
    }

    function shouldKick(e) {
        if (e.response.status === 401 || e.response.status === 403) {
            Cookies.remove("q_user_obj");
            Cookies.remove("q_user_jwt_token");
            Cookies.remove("q_user_store");
            Cookies.remove("q_user_bank");
            window.location.href = "/login";
        }
    };


    useEffect(function () {
        Cookies.set("q_user_obj", JSON.stringify(user), { expires: 365 });
        Cookies.set("q_user_jwt_token", token, { expires: 365 });
        Cookies.set("q_user_store", JSON.stringify(store), { expires: 365 });
        Cookies.set("q_user_bank", JSON.stringify(bank), { expires: 365 });
    }, [user, token, store, bank]);

    // CREATE CONTEXT DATA
    let contextData = {
        user,
        token,
        handleChange,
        handleUser,
        signoutUser,
        shouldKick,

        store,
        handleStore,

        bank,
        handleBank
    }


    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useAuthContext = () => useContext(AuthContext);