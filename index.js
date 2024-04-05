require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { connectToMongoDB } = require("./DB/mongo_Connection");
const { MinuteData } = require("./././DB/model/eachMinute.Model");
const { FiveMinuteData } = require("./././DB/model/fiveMinute.Model");
const { FifteenMinuteData } = require("./././DB/model/fifteenMinute.Model");
const { oneHourData } = require("./././DB/model/oneHour.Model");
const { fourHourData } = require("./././DB/model/fourHour.Model");
const { oneDayDataModel } = require("./././DB/model/oneDay.Model");

const db = {
  "1m": MinuteData,
  "5m": FiveMinuteData,
  "15m": FifteenMinuteData,
  "1hr": oneHourData,
  "4hr": fourHourData,
  "1d": oneDayDataModel,
};

app.use(
  cors({
    origin: "*",
  })
);

app.get("/getData/:timeSlot", async (req, res) => {
  console.log("//========= API TimeSlot : ", req.params);
  try {
    if (req.params.timeSlot) {
      const data = await db[req.params.timeSlot].find();
      console.log("data : ", data);
      return res.json({ data: data });
    }
  } catch (e) {
    return res.json({ err: e });
  }
});

connectToMongoDB()
  .then((d) => {
    console.log("//=== Mongo Connected ==//");
    app.listen(4000, () => {
      console.log("http://localhost:4000");
    });
  })
  .catch((e) => console.log(e));
