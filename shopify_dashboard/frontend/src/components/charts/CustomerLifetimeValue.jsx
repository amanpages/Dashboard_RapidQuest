import React, { useEffect, useRef, useState } from 'react';
import { Chart, LineController, BarController, PieController, LineElement, BarElement, PointElement, ArcElement, LinearScale, Title, Tooltip, Legend, CategoryScale, Filler } from 'chart.js';
import { getCustomerLifetimeValue } from '../../services/apiService';

// Register Chart.js components
Chart.register(LineController, BarController, PieController, LineElement, BarElement, ArcElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale, Filler);

const CustomerLifetimeValue = () => {
    const chartRef = useRef(null);
    const canvasRef = useRef(null);
    const [chartType, setChartType] = useState('line');

    useEffect(() => {
        const fetchDataAndRenderChart = async () => {
            try {
                const response = await getCustomerLifetimeValue();
                console.log('API Response:', response);

                if (Array.isArray(response)) {
                    const labels = [];
                    const values = [];

                    response.forEach(item => {
                        if (item.cohort && item.cohortTotalValue !== undefined) {
                            labels.push(item.cohort);
                            values.push(parseFloat(item.cohortTotalValue) || 0);
                        }
                    });

                    console.log('Processed Labels:', labels);
                    console.log('Processed Values:', values);

                    if (chartRef.current) {
                        chartRef.current.destroy(); 
                    }

                    chartRef.current = new Chart(canvasRef.current, {
                        type: chartType, // Use dynamic chart type
                        data: {
                            labels: labels,
                            datasets: [
                                {
                                    label: 'Customer Lifetime Value',
                                    data: values,
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    backgroundColor: chartType === 'pie' ? ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)'] : 'rgba(255, 99, 132, 0.2)',
                                    fill: chartType === 'line',
                                    borderWidth: 2,
                                    tension: chartType === 'line' ? 0.4 : 0,
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
                                    text: `Customer Lifetime Value by Cohort (${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart)`
                                }
                            },
                            scales: chartType !== 'pie' ? {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Cohort'
                                    }
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Total Spent'
                                    }
                                }
                            } : {}
                        }
                    });
                } else {
                    console.warn('Data is not in expected format or empty');
                }
            } catch (error) {
                console.error('Error fetching customer lifetime value data:', error);
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

export default CustomerLifetimeValue;
