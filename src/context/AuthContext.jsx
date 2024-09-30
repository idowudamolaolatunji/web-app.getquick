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

    function handleChange(user, token ) {
		setUser(user);
		setToken(token);
	};

	function handleUser(user) {
		setUser(user);
	};

    async function signoutUser() {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/logout`);
            if(!res.ok) throw new Error('Check internet connection');
            
            handleChange(null, null);
        } catch(err) {
            console.log(err.message);
        }
    }


    useEffect(function() {
        Cookies.set("q_user_obj", JSON.stringify(user), { expires: 365 });
		Cookies.set("q_user_jwt_token", token, { expires: 365 });
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