import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
const BASE_API_URL = import.meta.env.VITE_API_URL;


//////////////////////////////////////////////
//// CREATING CONTEXT ////
//////////////////////////////////////////////
const FetchedContext = createContext();
export default FetchedContext;


//////////////////////////////////////////////
//// CREATING PROVIDER ////
//////////////////////////////////////////////
export const FetchedProvider = ({ children }) => {
    const { token } = useAuthContext();
    const [collections, setCollections] = useState([]);
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [storeCategories, setStoreCategories] = useState([]);

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
    

    async function handleFetchStoreCategories() {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/stores/category`);
            const data = await res.json();
            setStoreCategories(data.data.categories);
        } catch (err) {
            console.log(err.message);
        }
    }

    async function handleFetchUserStoreCollection() {
        const res = await fetch(`${BASE_API_URL}/collections/mine/all`, { method: "GET", headers })
        const data = await res.json();
        if(data?.data) setCollections(data?.data?.collections);
    }

    async function handleFetchUserStoreProducts() {
        const res = await fetch(`${BASE_API_URL}/products/mine/all`, { method: "GET", headers });
        const data = await res.json();
        if(data?.data) setProducts(data?.data?.products);
    }

    async function handleFetchUserStoreCustomers() {
        const res = await fetch(`${BASE_API_URL}/customers/mine/all`, { method: "GET", headers });
        const data = await res.json();
        if(data?.data) setCustomers(data?.data?.customers);
    }


    async function handleImageUpload(Imgfile, url) {
        const formData = new FormData();
        if (Array.isArray(Imgfile)) {
            for (let i = 0; i < Imgfile.length; i++) {
                console.log(Imgfile[i])
                formData.append("images", Imgfile[i]);
            }
        } else {
            formData.append("image", Imgfile);
        }

        const res = await fetch(`${BASE_API_URL}/${url}`, {
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
        handleFetchUserStoreCollection();
        handleFetchUserStoreProducts();
        // handleFetchUserStoreCustomers();
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