// src/services/apiService.js
import axios from 'axios';

// Define the base URL for the API
const API_BASE_URL = 'http://localhost:5000/api';

// Create an Axios instance with the base URL
const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

// Define API calls using the Axios instance
export const getNewCustomers = async () => {
    try {
        const response = await apiClient.get('/customers/new-customers');
        return response.data;
    } catch (error) {
        console.error('API error (New Customers):', error);
        throw error;
    }
};

export const getCustomerDistribution = async () => {
    try {
        const response = await apiClient.get('/customers/customer-distribution');
        return response.data;
    } catch (error) {
        console.error('API error (Customer Distribution):', error);
        throw error;
    }
};

export const getTotalSalesOverTime = async () => {
    try {
        const response = await apiClient.get('/orders/total-sales-over-time');
        return response.data;
    } catch (error) {
        console.error('API error (Total Sales Over Time):', error);
        throw error;
    }
};

export const getSalesGrowthRate = async () => {
    try {
        const response = await apiClient.get('/orders/sales-growth-rate');
        return response.data;
    } catch (error) {
        console.error('API error (Sales Growth Rate):', error);
        throw error;
    }
};

export const getRepeatCustomers = async () => {
    try {
        const response = await apiClient.get('/orders/repeat-customers');
        return response.data;
    } catch (error) {
        console.error('API error (Repeat Customers):', error);
        throw error;
    }
};

export const getCustomerLifetimeValue = async () => {
    try {
        const response = await apiClient.get('/orders/customer-lifetime-value');
        return response.data;
    } catch (error) {
        console.error('API error (Customer Lifetime Value):', error);
        throw error;
    }
};

export const getProducts = async () => {
    try {
        const response = await apiClient.get('/products/all-products');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};
