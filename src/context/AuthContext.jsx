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
    const [user, setUser] = useState(Cookies.get('quicka_user') ? JSON.parse(Cookies.get('quicka_user')) : null);
    const [token, setToken] = useState(Cookies.get('quicka_token') ? Cookies.get('quicka_token') : null);

    function handleChange(user, token ) {
		setUser(user);
		setToken(token);
	};

	function handleUser(user) {
		setUser(user);
	};

    async function signoutUser() {
        try {
            const res = await fetch('http://localhost:3555/api/users/logout');
            if(!res.ok) throw new Error('Check internet connection');
            
            handleChange(null, null);
        } catch(err) {
            console.log(err.message);
        }
    }


    useEffect(function() {
        Cookies.set("quicka_user", JSON.stringify(user), { expires: 365 });
		Cookies.set("quicka_token", token, { expires: 365 });
    }, [user, token])

 // CREATE CONTEXT DATA
    let contextData = {
        user,
        token,
        handleChange,
        handleUser,
        signoutUser,

    }


    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useAuthContext = () => useContext(AuthContext);