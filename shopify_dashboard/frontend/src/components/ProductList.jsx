import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/apiService';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="p-6 text-center text-xl">Loading products...</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Product List</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product._id} className="bg-white border border-gray-200 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <div className="p-4">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.title}</h3>
                                <p className="text-gray-600">Type: {product.product_type}</p>
                                <p className="text-gray-600">Vendor: {product.vendor}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-b-lg">
                                <h4 className="font-semibold text-gray-700 mb-2">Variants:</h4>
                                {product.variants.map(variant => (
                                    <div key={variant.id} className="border-t border-gray-200 pt-2 mt-2">
                                        <p className="text-gray-600">Variant ID: {variant.id}</p>
                                        <p className="text-gray-600">Price: <span className="text-green-500 font-semibold">${variant.price}</span></p>
                                        <p className="text-gray-600">Inventory: <span className="text-blue-500 font-semibold">{variant.inventory_quantity}</span></p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No products available.</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
