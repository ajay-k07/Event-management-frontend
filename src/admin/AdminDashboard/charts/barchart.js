import React, { useState, useEffect } from 'react'
import { Bar } from '@reactchartjs/react-chart.js'
import api from "../../../services/api";

const BarChart = () => {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let departments = ["MECH", "EEE", "CSE", "ECE", "IT"];
    let users = [];
    for (const department of departments) {
      api
        .get(`/users/${department}`)
        .then(res => {
          users.push(res.data.length);
          setChartData({
            labels: departments,
            datasets: [
              {
                label: '# of Users',
                data: users,
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

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  useEffect(() => {
    chart();
  }, []);
  return (
    <Bar data={chartData} options={options} />
  );
};

export default BarChart;