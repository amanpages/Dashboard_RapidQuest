import React, { useEffect, useRef, useState } from 'react';
import { Chart, LineController, BarController, PieController, LineElement, BarElement, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { getRepeatCustomers } from '../../services/apiService';

// Register the necessary Chart.js components
Chart.register(LineController, BarController, PieController, LineElement, BarElement, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const RepeatCustomers = () => {
    const chartRef = useRef(null);
    const canvasRef = useRef(null);
    const [chartType, setChartType] = useState('line'); // Default chart type

    useEffect(() => {
        const fetchDataAndRenderChart = async () => {
            try {
                const response = await getRepeatCustomers();
                console.log('API Response:', response);

                if (Array.isArray(response)) {
                    const labels = [];
                    const values = [];

                    response.forEach(item => {
                        if (item.firstOrderDate && item.orderCount !== undefined) {
                            labels.push(new Date(item.firstOrderDate).toLocaleDateString());
                            values.push(item.orderCount);
                        }
                    });

                    console.log('Processed Labels:', labels);
                    console.log('Processed Values:', values);

                    if (chartRef.current) {
                        chartRef.current.destroy();
                    }

                    // Create a new chart
                    chartRef.current = new Chart(canvasRef.current, {
                        type: chartType, // Dynamic chart type
                        data: {
                            labels: labels,
                            datasets: [
                                {
                                    label: 'Repeat Orders',
                                    data: values,
                                    backgroundColor: chartType === 'pie' ? 
                                        ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'] 
                                        : 'rgba(75, 192, 192, 0.2)',
                                    borderColor: 'rgba(75, 192, 192, 1)',
                                    borderWidth: 1,
                                    fill: chartType === 'line',
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: `Repeat Customers Orders (${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart)`
                                }
                            },
                            scales: chartType !== 'pie' ? {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'First Order Date'
                                    },
                                    ticks: {
                                        autoSkip: true,
                                        maxTicksLimit: 20
                                    }
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Order Count'
                                    },
                                    beginAtZero: true
                                }
                            } : {}
                        }
                    });
                } else {
                    console.warn('Data is not in expected format or empty');
                }
            } catch (error) {
                console.error('Error fetching repeat customers data:', error);
            }
        };

        fetchDataAndRenderChart();

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [chartType]); // Re-run the effect when chartType changes

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <canvas ref={canvasRef}></canvas>
            <div className="flex justify-center mt-4">
                <button 
                    className={`mx-2 p-2 rounded ${chartType === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
                    onClick={() => setChartType('line')}
                >
                    Line
                </button>
                <button 
                    className={`mx-2 p-2 rounded ${chartType === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
                    onClick={() => setChartType('bar')}
                >
                    Bar
                </button>
                <button 
                    className={`mx-2 p-2 rounded ${chartType === 'pie' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
                    onClick={() => setChartType('pie')}
                >
                    Pie
                </button>
            </div>
        </div>
    );
};

export default RepeatCustomers;
