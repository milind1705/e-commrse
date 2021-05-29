const express = require ('express');
const router = require('./routes/auth-route')
const router1 = require('./routes/routes')
const PORT = 3000;
const connectDb = require('./models/connection')
require('dotenv').config()


const app = express();
connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: false}))
app.set('view engine', 'ejs')

//routes
app.use('/api/user/', router)
app.use('/admin/',router1)

app.listen(PORT, (req, res) => {
    console.log(`server is running at port ${PORT}`)   
})