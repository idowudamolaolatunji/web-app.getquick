import React, { lazy, Suspense, useEffect, useState } from 'react'
import DashboardBase from './ui/DashboardBase'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Spinner from './components/spinner';
import ProtectedRoute from './utils/ProtectedRoute';

const Login = lazy(() => import('./auth/login'));
const Signup = lazy(() => import('./auth/signup'));
const Error = lazy(() => import('./pages/error'));

const DashboardHome = lazy(() => import('./pages/home'));
const Orders = lazy(() => import('./pages/orders'));
const Products = lazy(() => import('./pages/products'));
const Transaction = lazy(() => import('./pages/transactions'));
const Settings = lazy(() => import('./pages/settings'));
const Profile = lazy(() => import('./pages/profile'));
const ConnectedApps = lazy(() => import('./pages/connectedApps'));
const StoreCustomization = lazy(() => import('./pages/storeCustomization'));
const CustomDomain = lazy(() => import('./pages/customDomain'));
const StoreInformation = lazy(() => import('./pages/storeInfo'));
const Customers = lazy(() => import('./pages/customers'));
const RunSales = lazy(() => import('./pages/salesAndCoupon'));
const BankDetails = lazy(() => import('./pages/bankDetails'));
const Delivery = lazy(() => import('./pages/delivery'));
const Subscription = lazy(() => import('./pages/subscription'));
const Analytics = lazy(() => import('./pages/analytics'));

function App() {
    return (

        <Suspense fallback={<Spinner />}>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/register' element={<Signup />}></Route>
                    <Route path="*" element={<Error />} />

                    <Route element={<ProtectedRoute><DashboardBase /></ProtectedRoute>}>
                        <Route path='/' element={<DashboardHome />}></Route>
                        <Route path='/dashboard' element={<DashboardHome />}></Route>
                        <Route path='/dashboard/orders' element={<Orders />}></Route>
                        <Route path='/dashboard/products' element={<Products />}></Route>
                        <Route path='/dashboard/transactions' element={<Transaction />}></Route>
                        <Route path='/dashboard/settings' element={<Settings />}></Route>
                        <Route path='/dashboard/custom-domain' element={<CustomDomain />}></Route>
                        <Route path='/dashboard/connected-apps' element={<ConnectedApps />}></Route>
                        <Route path='/dashboard/store-customization' element={<StoreCustomization />}></Route>
                        <Route path='/dashboard/bank-details' element={<BankDetails />}></Route>
                        <Route path='/dashboard/store-info' element={<StoreInformation />}></Route>
                        <Route path='/dashboard/run-sales' element={<RunSales />}></Route>
                        <Route path='/dashboard/delivery' element={<Delivery />}></Route>
                        <Route path='/dashboard/subscription' element={<Subscription />}></Route>
                        <Route path='/dashboard/profile' element={<Profile />}></Route>
                        <Route path='/dashboard/customers' element={<Customers />}></Route>
                        <Route path='/dashboard/analytics' element={<Analytics />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Suspense>
    )
}

export default App