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
    const { token, user } = useAuthContext();

    const [collections, setCollections] = useState([]);
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [storeCategories, setStoreCategories] = useState([]);

    // THIS STATES SERVES AS HELPER IN THE INDIVIDUAL COMPONENTS
    const [loader, setLoader] = useState({
        product: false,
        order: false,
        customer: false,
        collection: false
    })
    const [error, setError] = useState({
        product: false,
        order: false,
        customer: false,
        collection: false
    });

    // console.log(loader)

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }

    function handleLoader(name, value) {
        setLoader({...loader, [name]: value});
    }

    function handleError(name, value) {
        setError({...error, [name]: value});
    }

    function handleResetLE(name) {
        handleError(name, false);
        handleLoader(name, true);
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
        handleLoader("collection", true);
        const res = await fetch(`${BASE_API_URL}/collections/mine/collections`, { method: "GET", headers })
        const data = await res.json();
        if (data?.data) setCollections(data?.data?.collections);
        handleLoader("collection", false);
    }

    async function handleFetchUserStoreProducts() {
        handleResetLE("product");
        try {
            const res = await fetch(`${BASE_API_URL}/products/mine/products`, { method: "GET", headers });
            const data = await res.json();
            if(!res.ok) throw new Error();
            if(data.status == "fail") throw new Error();
            if (data?.data) setProducts(data?.data?.products);
            handleLoader("product", false);
        } catch (err) {
            handleError("product", true);
            handleLoader("product", false);
        }
    }

    async function handleFetchUserStoreOrders() {
        handleResetLE("order");
        try {
            const res = await fetch(`${BASE_API_URL}/orders/mine/orders`, { method: "GET", headers });
            const data = await res.json();
            if(!res.ok) throw new Error();
            if(data.status == "fail") throw new Error();
            if (data?.data) setOrders(data?.data?.orders);
            handleLoader("order", false);
        } catch (err) {
            handleError("order", true);
            handleLoader("order", false);
        }

    }

    async function handleFetchUserStoreCustomers() {
        handleResetLE("customer");
        try {
            const res = await fetch(`${BASE_API_URL}/customers/mine/customers`, { method: "GET", headers });
            const data = await res.json();
            if(!res.ok) throw new Error();
            if(data.status == "fail") throw new Error();
            if (data?.data) setCustomers(data?.data?.customers);

            handleLoader("customer", false);
        } catch (err) {
            handleError("customer", true);
            handleLoader("customer", false);
        }
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


    useEffect(function () {
        setCollections([])
        setProducts([])
        setOrders([])
        setCustomers([]);

        if(token && user) {
            handleFetchUserStoreOrders();
            handleFetchUserStoreProducts();
            handleFetchUserStoreCustomers();
            handleFetchUserStoreCollection();
        }
    }, [token, user])


    // CREATE CONTEXT DATA
    let contextData = {
        handleImageUpload,
        error,
        loader,

        orders,
        products,
        collections,
        handleFetchUserStoreOrders,
        handleFetchUserStoreProducts,
        handleFetchUserStoreCustomers,
        handleFetchUserStoreCollection,


        storeCategories,
        handleFetchStoreCategories
    }


    return <FetchedContext.Provider value={contextData}>{children}</FetchedContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useFetchedContext = () => useContext(FetchedContext);