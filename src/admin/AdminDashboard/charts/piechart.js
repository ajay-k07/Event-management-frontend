import React, { useState, useEffect } from 'react'
import { Pie } from '@reactchartjs/react-chart.js'
import api from "../../../services/api";

const BarChart = () => {
    const [chartData, setChartData] = useState({});

    const chart = () => {
        let categories = ["Hackathon", "Workshop", "Technical Competitions", "Conference"];
        let events = [];
        for (const category of categories) {
            api
                .get(`/events/${category}`)
                .then(res => {
                    events.push(res.data.length);
                    setChartData({
                        labels: categories,
                        datasets: [
                            {
                                label: '# of Events',
                                data: events,
                                backgroundColor: [
                                    'rgba(220,20,60,0.2)',
                                    'rgba(0,206,209,0.2)',
                                    'rgba(244,164,96,0.2)',
                                    'rgba(154,205,50,0.2)',
                                    'rgba(147,112,219,0.2)',
                                ],
                                borderColor: [
                                    'rgba(220,20,60,1)',
                                    'rgba(0,206,209,1)',
                                    'rgba(244,164,96,1)',
                                    'rgba(154,205,50,1)',
                                    'rgba(147,112,219,1)',
                                ],
                                borderWidth: 1,
                            },
                        ],
                    })
                }
                )
                .catch(err => {
                    console.log(err)
                })
        }
    };


    useEffect(() => {
        chart();
    }, []);
    return (
        <Pie data={chartData} />
    );
};

export default BarChart;