import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";

// axios.create({
//   baseURL: "http://localhost:4000",
//   // You can add headers or other configurations here
// });

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get("http://localhost:4000/getData/1m")
          .then((data) => console.log(data.data))
          .catch((error) => console.log(error));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const options = {
    scales: {
      x: {
        type: "category",
        labels: data.labels,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    setData({
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "Sales",
          data: [65, 59, 80, 81, 56],
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, []);

  return (
    <div className="App">
      <div>
        <h2>Bar Chart Example</h2>
        <Bar
          data={{
            labels: ["January", "February", "March", "April", "May"],
            datasets: [
              {
                label: "Sales",
                data: [65, 59, 80, 81, 56],
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          }}
          options={options}
        />
      </div>
    </div>
  );
}

export default App;
