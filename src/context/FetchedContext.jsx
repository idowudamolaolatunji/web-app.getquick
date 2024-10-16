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
    const [products, setProducts] = useState([]);
    const [storeCategories, setStoreCategories] = useState([]);
    

    async function handleFetchStoreCategories() {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/stores/category`);
            const data = await res.json();
            setStoreCategories(data.data.categories);
        } catch (err) {
            console.log(err.message);
        }
    }

    async function handleFetchCollections() {
        const res = await fetch(`${BASE_URL}/collections/all`)
        const data = await res.json();
        if(data?.data) setCollections(data?.data?.collections);
    }

    async function handleFetchProducts() {
        const res = await fetch(`${BASE_URL}/products/all`);
        const data = await res.json();
        if(data?.data) setProducts(data?.data?.products);
    }


    async function handleImageUpload(Imgfile, url, token) {
        const formData = new FormData();
        if (Array.isArray(Imgfile)) {
            for (let i = 0; i < Imgfile.length; i++) {
                console.log(Imgfile[i])
                formData.append("images", Imgfile[i]);
            }
        } else {
            formData.append("image", Imgfile);
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
        handleFetchProducts();
    }, [])


    // CREATE CONTEXT DATA
    let contextData = {
        collections,
        products,

        handleImageUpload,

        storeCategories,
        handleFetchStoreCategories
    }


    return <FetchedContext.Provider value={contextData}>{children}</FetchedContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useFetchedContext = () => useContext(FetchedContext);