import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
import LineChart from "./Components/LineChart";
import { Chart } from "react-google-charts";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

function App() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleData = (value) => {
    if (
      value === "1m" ||
      value === "5m" ||
      value === "15m" ||
      value === "1h" ||
      value === "4h" ||
      value === "1d"
    ) {
      console.log("option : ", value);
    }
  };

  return (
    <div className="App">
      <h1>Assignment 3</h1>
      <div>
        <Button
          onClick={handleClick}
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Time Slots
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleData("1m")}>1 min</MenuItem>
          <MenuItem onClick={() => handleData("5m")}>5 min</MenuItem>
          <MenuItem onClick={() => handleData("15m")}>15 min</MenuItem>
          <MenuItem onClick={() => handleData("1h")}>1 hour</MenuItem>
          <MenuItem onClick={() => handleData("4h")}>4 hour</MenuItem>
          <MenuItem onClick={() => handleData("1d")}>1 Day</MenuItem>
        </Menu>
      </div>
      <LineChart />
    </div>
  );
}

export default App;
