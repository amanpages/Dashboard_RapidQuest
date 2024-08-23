import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const sidebarItems = [
    { path: '/total-sales', label: 'Total Sales Over Time' },
    { path: '/sales-growth', label: 'Sales Growth Rate Over Time' },
    { path: '/new-customers', label: 'New Customers Added Over Time' },
    { path: '/repeat-customers', label: 'Number of Repeat Customers' },
    { path: '/geo-distribution', label: 'Geographical Distribution of Customers' },
    { path: '/customer-lifetime-value', label: 'Customer Lifetime Value by Cohorts' },
    { path: '/products', label: 'All Products' }
];

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="h-full bg-gray-900 text-white flex flex-col w-64 shadow-lg">
            <div className="p-6 text-2xl font-extrabold text-center bg-gray-800">Dashboard</div>
            <ul className="flex flex-col flex-grow mt-4">
                {sidebarItems.map(item => (
                    <li key={item.path} className={`p-4 hover:bg-gray-700 hover:text-white transition-all duration-300 ${location.pathname === item.path ? 'bg-gray-700 text-blue-400 border-r-4 border-blue-400' : 'text-gray-400'}`}>
                        <Link to={item.path} className="flex items-center">
                            <span className="ml-2">{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="p-4 text-sm text-gray-600 text-center mt-auto">
                © 2024 Cohort Dashboard
            </div>
        </div>
    );
};

export default Sidebar;
