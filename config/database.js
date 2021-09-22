const mongoose = require('mongoose')

const connectDB = function(){

    try{
        mongoose.connect(process.env.MONGODB_URI, {

        })

        console.log("connected mongodb...")
    }
    catch(err){
        console.log(err)
    }
}

module.exports = connectDB