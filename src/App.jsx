import React, { lazy, Suspense, useEffect, useState } from 'react'
import DashboardBase from './ui/DashboardBase'
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Spinner from './components/Spinner';
import ProtectedRoute from './utils/ProtectedRoute';

const DashboardHome = lazy(() => import('./pages/home'));
const Orders = lazy(() => import('./pages/orders'));
const Products = lazy(() => import('./pages/products'));
const Transaction = lazy(() => import('./pages/transactions'));
const Settings = lazy(() => import('./pages/settings'));

function App() {
    return (

        <DashboardBase>
        <Suspense fallback={<Spinner />}>
            <BrowserRouter>
                <Routes>
                    {/* <Route element={<ProtectedRoute />}> */}
                    <Route path='/' element={<DashboardHome />}></Route>
                    <Route path='/dashboard' element={<DashboardHome />}></Route>

                    <Route path='/dashboard/orders' element={<Orders />}></Route>
                    <Route path='/dashboard/products' element={<Products />}></Route>
                    <Route path='/dashboard/transactions' element={<Transaction />}></Route>
                    <Route path='/dashboard/settings' element={<Settings />}></Route>
                    {/* </Route> */}
                </Routes>
            </BrowserRouter>
        </Suspense>
        </DashboardBase>
    )
}

export default App