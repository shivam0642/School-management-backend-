const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
const {connectDB} = require('./config/db')

dotenv.config();

const app = express()

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))


connectDB();

//Routes
app.use("/api/v1/school",require("./routes/schoolRoutes"))

PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})