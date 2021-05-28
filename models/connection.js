const mongoose = require('mongoose');

const connectDb = async () => {
const connection = await mongoose.connect('mongodb://localhost:27017/ecom',{
    useCreateIndex:true,
    useUnifiedTopology: true,
    useNewUrlParser:true
});
console.log('connected to mongoDb')
} 


module.exports= connectDb;