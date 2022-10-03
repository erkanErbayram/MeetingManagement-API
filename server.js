const express = require("express");
const app = express();
const dbConnect = require("./config/db")
require("dotenv").config();

//app.use(express.static("public"));
//<---BODYPARSER-->
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//<---BODYPARSER-->

//<---Mongo DB CONNECT--->
dbConnect();
//<---Mongo DB CONNECT--->

app.get('/',(req,res)=>{
    res.send("Meeting API")
})
//<---ROUTES--->
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/meetingRoom", require("./routes/meetingRoomRoute"));
app.use("/api/meeting", require("./routes/meetingRoute"));
app.use("/api/company", require("./routes/companyRoute"));
app.use("/api/product", require("./routes/productRoute"));
app.use("/api/order", require("./routes/orderRoute"));
//<---ROUTES--->
app.listen(process.env.PORT, () => {
  console.log(`Server Running on port ${process.env.PORT}`);
});
