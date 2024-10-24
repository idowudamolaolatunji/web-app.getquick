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
    const [deliveryRates, setDeliveryRates] = useState([]);
    const [storeCategories, setStoreCategories] = useState([]);

    const [orderLoader, setOrderLoader] = useState(true);
    const [productLoader, setProductLoader] = useState(true);
    const [deliveryLoader, setDeliveryLoader] = useState(true);
    const [customerLoader, setCustomerLoader] = useState(true);
    const [collectionLoader, setCollectionLoader] = useState(true);

    const [error, setError] = useState({
        order: false, product: false, customer: false, collection: false, delivery: false,
    });

    // SETTING LOADER THIS WAY IS BETTER THAN THE PREVIOUS
    const loader = {
        order: orderLoader,
        product: productLoader,
        delivery: deliveryLoader,
        customer: customerLoader,
        collection: collectionLoader,
    }

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }

    function handleError(name, value) {
        setError({...error, [name]: value});
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
        try {
            handleError("collection", false);
            setCollectionLoader(true);
            setCollections([]);

            const res = await fetch(`${BASE_API_URL}/collections/mine/collections`, { method: "GET", headers })
            const data = await res.json();
            if(!res.ok) throw new Error();
            if(data.status == "fail") throw new Error();
            if (data?.data) setCollections(data?.data?.collections);
        } catch(err) {
            handleError("collection", true);
        } finally {
            setCollectionLoader(false);
        }
    }

    async function handleFetchUserStoreProducts() {
        try {
            handleError("product", false);
            setProductLoader(true);
            setProducts([]);

            const res = await fetch(`${BASE_API_URL}/products/mine/products`, { method: "GET", headers });
            const data = await res.json();
            if(!res.ok) throw new Error();
            if(data.status == "fail") throw new Error();
            if (data?.data) setProducts(data?.data?.products);
        } catch (err) {
            handleError("product", true);
        } finally {
            setProductLoader(false);
        }
    }

    async function handleFetchUserStoreOrders() {
        try {
            handleError("order", false);
            setOrderLoader(true);
            setOrders([]);

            const res = await fetch(`${BASE_API_URL}/orders/mine/orders`, { method: "GET", headers });
            const data = await res.json();
            if(!res.ok) throw new Error();
            if(data.status == "fail") throw new Error();
            if (data?.data) setOrders(data?.data?.orders);
        } catch (err) {
            handleError("order", true);
        } finally {
            setOrderLoader(false);
        }

    }

    async function handleFetchUserStoreCustomers() {
        try {
            handleError("customer", false);
            setCustomerLoader(true);
            setCustomers([]);

            const res = await fetch(`${BASE_API_URL}/customers/mine/customers`, { method: "GET", headers });
            const data = await res.json();
            if(!res.ok) throw new Error();
            if(data.status == "fail") throw new Error();
            if (data?.data) setCustomers(data?.data?.customers);
        } catch (err) {
            handleError("customer", true);
        } finally {
            setCustomerLoader(false);
        }
    }


    async function handleFetchUserStoreDeliveryRates () {
        try {
            handleError("delivery", false);
            setDeliveryLoader(true);
            setDeliveryRates([]);

            const res = await fetch(`${BASE_API_URL}/delivery-rates/mine/delivery-rates`, { method: "GET", headers });
            const data = await res.json();
            if(!res.ok) throw new Error();
            if(data.status == "fail") throw new Error();
            if (data?.data) setDeliveryRates(data?.data?.rates);
        } catch (err) {
            handleError("delivery", true);
        } finally {
            setDeliveryLoader(false);
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
        setCollections([]);
        setProducts([]);
        setOrders([]);
        setCustomers([]);
        setDeliveryRates([]);

        if(token && user) {
            handleFetchUserStoreOrders();
            handleFetchUserStoreProducts();
            handleFetchUserStoreCustomers();
            handleFetchUserStoreCollection();
            handleFetchUserStoreDeliveryRates();
        }
    }, [token, user])


    // CREATE CONTEXT DATA
    let contextData = {
        error,
        loader,
        
        orders,
        products,
        customers,
        collections,
        deliveryRates,
        handleFetchUserStoreOrders,
        handleFetchUserStoreProducts,
        handleFetchUserStoreCustomers,
        handleFetchUserStoreCollection,
        handleFetchUserStoreDeliveryRates,

        
        storeCategories,
        handleImageUpload,
        handleFetchStoreCategories
    }


    return <FetchedContext.Provider value={contextData}>{children}</FetchedContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useFetchedContext = () => useContext(FetchedContext);