const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/chat-app';

const connectToDataBase = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('database connected')
    } catch (error) {
        console.log("error in connecting database ", error);
    }
}

module.exports = connectToDataBase;