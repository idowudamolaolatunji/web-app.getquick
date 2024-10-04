import React, { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './utils/ProtectedRoute';
import './pages/generalStyle.css';

// const Login = lazy(() => import('./auth/login'));
// const Signup = lazy(() => import('./auth/signup'));
// const Error = lazy(() => import('./pages/error'));

import Login from './auth/login';
import Signup from './auth/signup';
import ForgotPassword from './auth/forgotPassword';
import VerifyOtp from './auth/otpVerification';
import Onboarding from './auth/onboarding';
import Congrats from './auth/NextCongratsScreen';
import Error from './pages/error';

// const DashboardHome = lazy(() => import('./pages/home'));
// const Orders = lazy(() => import('./pages/orders'));
// const Products = lazy(() => import('./pages/products'));
// const Transaction = lazy(() => import('./pages/transactions'));
// const Settings = lazy(() => import('./pages/settings'));
// const Profile = lazy(() => import('./pages/profile'));
// const ConnectedApps = lazy(() => import('./pages/connectedApps'));
// const StoreCustomization = lazy(() => import('./pages/storeCustomization'));
// const CustomDomain = lazy(() => import('./pages/customDomain'));
// const StoreInformation = lazy(() => import('./pages/storeInfo'));
// const Customers = lazy(() => import('./pages/customers'));
// const RunSales = lazy(() => import('./pages/salesAndCoupon'));
// const BankDetails = lazy(() => import('./pages/bankDetails'));
// const Delivery = lazy(() => import('./pages/delivery'));
// const Subscription = lazy(() => import('./pages/subscription'));
// const Analytics = lazy(() => import('./pages/analytics'));

import DashboardHome from './pages/home';
import Orders from './pages/orders';
import Products from './pages/products';
import Transaction from './pages/transactions';
import Settings from './pages/settings';
import Profile from './pages/profile';
import ConnectedApps from './pages/connectedApps';
import StoreCustomization from './pages/storeCustomization';
import CustomDomain from './pages/customDomain';
import StoreInformation from './pages/storeInfo';
import Customers from './pages/customers';
import RunSales from './pages/salesAndCoupon';
import BankDetails from './pages/bankDetails';
import Delivery from './pages/delivery';
import Subscription from './pages/subscription';
import Analytics from './pages/analytics';
import CommunityForums from './pages/communityForums';

function App() {


    // COME BACK AND REMODIFY THIS OR NOT
    if (
        window.location.pathname === '/verify-otp' ||
        window.location.pathname === '/onboarding'
    ) {
        window.onbeforeunload = function() {
          return "Are you sure you want to leave this page?";
        };
    }


    return (

        // <Suspense fallback={<></>} >
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/signup' element={<Signup />}></Route>
                    <Route path='/forgot-password' element={<ForgotPassword />}></Route>
                    <Route path='/verify-otp' element={<VerifyOtp />}></Route>
                    <Route path='/onboarding' element={<Onboarding />}></Route>
                    <Route path='/congratulations' element={<Congrats />}></Route>
                    <Route path="*" element={<Error />} />

                    <Route element={<ProtectedRoute />}>
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
                        <Route path='/dashboard/community-forums' element={<CommunityForums />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        // </Suspense>
    )
}

export default App