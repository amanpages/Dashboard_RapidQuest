// src/components/Dashboard.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewCustomers from './charts/NewCustomers';
import GeoDistribution from './charts/GeoDistribution';
import TotalSalesOverTime from './charts/TotalSalesOverTime';
import SalesGrowthRate from './charts/SalesGrowthRate';
import RepeatCustomers from './charts/RepeatCustomers';
import CustomerLifetimeValue from './charts/CustomerLifetimeValue';
import ProductList from './ProductList';
import Sidebar from './Sidebar';

const Dashboard = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-grow bg-gradient-to-br from-blue-100 to-gray-100">
                <div className="bg-white shadow-lg p-4 flex justify-between items-center rounded-b-lg">
                    <div className="flex-grow flex justify-center">
                        <div className="text-3xl font-extrabold text-gray-700">Sales Dashboard</div>
                    </div>
                </div>
                <div className="flex-grow p-6 overflow-y-auto">
                    <Routes>
                        <Route path="/new-customers" element={<NewCustomers />} />
                        <Route path="/geo-distribution" element={<GeoDistribution />} />
                        <Route path="/total-sales" element={<TotalSalesOverTime />} />
                        <Route path="/sales-growth" element={<SalesGrowthRate />} />
                        <Route path="/repeat-customers" element={<RepeatCustomers />} />
                        <Route path="/customer-lifetime-value" element={<CustomerLifetimeValue />} />
                        <Route path="/products" element={<ProductList />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
