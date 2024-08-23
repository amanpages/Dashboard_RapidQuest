import React, { useEffect, useRef, useState } from 'react';
import { Chart, LineController, BarController, PieController, LineElement, BarElement, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { getNewCustomers } from '../../services/apiService';

// Register the necessary Chart.js components
Chart.register(LineController, BarController, PieController, LineElement, BarElement, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const NewCustomers = () => {
    const chartRef = useRef(null);
    const canvasRef = useRef(null);
    const [chartType, setChartType] = useState('line'); // Default chart type

    useEffect(() => {
        const fetchDataAndRenderChart = async () => {
            try {
                const data = await getNewCustomers();
                console.log('API Response:', data);

                const labels = data.length > 0 ? data.map(item => item.date) : ['No Data'];
                const values = data.length > 0 ? data.map(item => item.count) : [0];

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
                                label: 'New Customers Over Time',
                                data: values,
                                backgroundColor: chartType === 'pie' ? ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'] : 'rgba(75, 192, 192, 0.2)',
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
                                text: `New Customers Over Time (${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart)`
                            }
                        },
                        scales: chartType !== 'pie' ? {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Date'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Count'
                                },
                                beginAtZero: true
                            }
                        } : {}
                    }
                });
            } catch (error) {
                console.error('Error fetching new customers data:', error);
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

export default NewCustomers;
