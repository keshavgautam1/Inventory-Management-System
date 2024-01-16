const mongoose = require('mongoose');

const mongoDB = mongoose.connect('mongodb://localhost:27017/IMS')
if (!mongoDB) {
    console.log("error while connecting the mongodb")
    return
}
console.log("connected to mongodb")

module.exports = mongoDB;
