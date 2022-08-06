const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('./../../models/tourModel');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
}).then(() => console.log("DB connects successfully"));


// read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));


//  import data into the database
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded!');
    } catch(err) {
        console.log(err);
    }
    process.exit();
};


//  DELETE DATA FORM DB
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log("Data deleted successfully");
    } catch(err) {
        console.log(err);
    }
    process.exit();
};


if(process.argv[2] === '--import') {
    importData();
} else if(process.argv[2] === '--delete') {
    deleteData();
}