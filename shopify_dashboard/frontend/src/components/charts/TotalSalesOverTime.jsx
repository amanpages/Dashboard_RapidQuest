import React, { useEffect, useRef, useState } from 'react';
import { Chart, LineController, BarController, PieController, LineElement, BarElement, ArcElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale, Filler } from 'chart.js';
import { getTotalSalesOverTime } from '../../services/apiService';

// Register Chart.js components
Chart.register(LineController, BarController, PieController, LineElement, BarElement, ArcElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale, Filler);

const TotalSalesOverTime = () => {
    const chartRef = useRef(null);
    const canvasRef = useRef(null);
    const [chartType, setChartType] = useState('line'); // Default chart type

    useEffect(() => {
        const fetchDataAndRenderChart = async () => {
            try {
                const data = await getTotalSalesOverTime();
                console.log('Fetched Total Sales Data:', data);

                if (data && data.length > 0) {
                    const labels = data.map(item => item._id); // Dates
                    const values = data.map(item => parseFloat(item.totalSales)); // Total sales

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
                                    label: 'Total Sales Over Time',
                                    data: values,
                                    borderColor: chartType === 'pie' ? '' : 'rgba(75, 192, 192, 1)',
                                    backgroundColor: chartType === 'pie' ?
                                        ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'] 
                                        : 'rgba(75, 192, 192, 0.2)',
                                    fill: chartType === 'line',
                                    tension: 0.4,
                                    borderWidth: 2,
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
                                    text: `Total Sales Over Time (${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart)`
                                }
                            },
                            scales: chartType !== 'pie' ? {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Date'
                                    },
                                    ticks: {
                                        autoSkip: true,
                                        maxTicksLimit: 20
                                    }
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Total Sales'
                                    },
                                    beginAtZero: true
                                }
                            } : {}
                        }
                    });
                }
            } catch (error) {
                console.error('Error fetching total sales data:', error);
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

export default TotalSalesOverTime;
