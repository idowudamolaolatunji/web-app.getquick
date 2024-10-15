import { createContext, useState, useEffect, useContext } from "react";
const BASE_URL = import.meta.env.VITE_SERVER_URL;


//////////////////////////////////////////////
//// CREATING CONTEXT ////
//////////////////////////////////////////////
const FetchedContext = createContext();
export default FetchedContext;


//////////////////////////////////////////////
//// CREATING PROVIDER ////
//////////////////////////////////////////////
export const FetchedProvider = ({ children }) => {
    const [collections, setCollections] = useState([]);

    async function handleFetchCollections() {
        const res = await fetch(`${BASE_URL}/products/collection/all`)
        const data = await res.json();
        if(data?.data) setCollections(data?.data?.collections);
    }


    async function handleImageUpload(images, url, token) {
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            console.log(images[i])
            formData.append('images', images[i]);
        }

        const res = await fetch(`${BASE_URL}/${url}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData,
        });

        if (!res.ok) return 'Something went wrong!';
        const data = await res.json();
        console.log(data, res)
    }


    useEffect(function() {
        handleFetchCollections();
    }, [])


    // CREATE CONTEXT DATA
    let contextData = {
        collections,

        handleImageUpload
    }


    return <FetchedContext.Provider value={contextData}>{children}</FetchedContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useFetchedContext = () => useContext(FetchedContext);