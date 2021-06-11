import React, { useState, useEffect } from "react";
import { Line } from "@reactchartjs/react-chart.js";
import api from "../../../services/api";

const Dankmemes = () => {
  const [chartData, setChartData] = useState({});


  const options = {
    title: { text: "THICKNESS SCALE", display: true },
    scales: {
      yAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
            beginAtZero: true
          },
          gridLines: {
            display: false
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ]
    }
  }

  useEffect(() => {
    const chart = () => {
      let registeredusers = [];
      let events = [];
      api
        .get("/registrations")
        .then(res => {
          for (const dataObj of res.data) {
            registeredusers.push(dataObj.users.length);
            api.get(`/event/${dataObj.event}`).then(res => {
              events.push(res.data.title)
              setChartData({
                labels: events,
                datasets: [
                  {
                    label: "Registered Users per event",
                    data: registeredusers,
                    backgroundColor: ["rgba(30,144,255,0.2)"],
                    borderColor: ["rgba(30,144,255,1)"],
                    borderWidth: 4
                  }
                ]
              });
            }).catch(err => {
              console.log(err)
            })
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    chart();
  }, []);


  return (
    <Line
      data={chartData}
      options={options}
    />
  );
};

export default Dankmemes;