const express = require ('express');
const mongoose = require ('mongoose');
const router = require('./routes/routes')
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/ecom',{
    useCreateIndex:true,
    useUnifiedTopology: true,
    useNewUrlParser:true
})
console.log('connected to mpngo db')
const app = express();

//routes
app.use('api/user/', require('./routes/auth-route'))
app.use('/admin/',router)

app.listen(PORT, (req, res) => {
    console.log(`server is running at port ${PORT}`)   
})