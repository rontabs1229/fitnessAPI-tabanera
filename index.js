const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//Routes Middleware
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

const app = express();

require('dotenv').config();

mongoose.connect(process.env.MONGODB_CONNECTION);

let db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("We're connected to the cloudbase database"))

const corsOptions = {
    origin:['http://localhost:4000'],
    credentials: true, 
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);



if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
	    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
	});
}

module.exports = {app,mongoose};