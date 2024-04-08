import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axiosInstance from "../Api/Api";

const LineChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [available, setAvailable] = useState(false);
  const [items, setItems] = useState([]);

  const dataApi = async (timeSlot) => {
    try {
      const response = await axiosInstance.get("/getData/1m");
      console.log("data : ", response.data.data);
      setAvailable(true);
      setItems(response.data.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    console.log("API useEffect");
    dataApi();
  }, []);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    console.log("//========== after fetch ===========// ");
    if (available == true && items.length > 0) {
      let data = {};

      const openDataArr = [];
      const highDataArr = [];
      const lowDataArr = [];
      const closeDataArr = [];
      const openLabelsArr = [];
      const highLabelsArr = [];
      const lowLabelsArr = [];
      const closeLabelsArr = [];

      for (let i of items) {
        openDataArr.push(i.open);
        openLabelsArr.push("Market");
      }

      for (let i of items) {
        highDataArr.push(i.high);
        highLabelsArr.push("green");
      }

      for (let i of items) {
        lowDataArr.push(i.low);
        lowLabelsArr.push("green");
      }

      for (let i of items) {
        closeDataArr.push(i.close);
        closeLabelsArr.push("green");
      }

      // Sample data
      data = {
        labels: openLabelsArr,
        datasets: [
          {
            label: "Open",
            data: openDataArr,
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
          {
            label: "High",
            data: highDataArr,
            backgroundColor: ["rgba(54, 162, 235, 0.2)"],
            borderColor: ["rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
          {
            label: "Low",
            data: lowDataArr,
            backgroundColor: ["rgba(255, 206, 86, 0.2)"],
            borderColor: ["rgba(255, 206, 86, 1)"],
            borderWidth: 1,
          },
          {
            label: "Close",
            data: closeDataArr,
            backgroundColor: ["rgba(75, 192, 192, 0.2)"],
            borderColor: ["rgba(75, 192, 192, 1)"],
            borderWidth: 1,
          },
        ],
      };

      const options = {
        responsive: true,
        legend: {
          display: false,
        },
        type: "bar",
        //   scales: {
        //     y: {
        //       beginAtZero: true
        //     }
        //   }
      };

      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: data,
        options: options,
      });
    }
  }, [available]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};


export default LineChart;
