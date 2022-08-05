const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({path: './config.env'});

const app = require('./app');

console.log(process.env.DATABASE);

/** REMOTE DATABASE CONNECTION */
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true
}).then((conn) => {
    // console.log(conn.connection);
    console.log("DB connection successful!");
});
/** REMOTE DATABASE CONNECTION */

/** LOCAL DATABASE CONNECTION */
// mongoose.connect(process.env.DATABASE_LOCAL, {
//     useNewUrlParser: true
// }).then((conn) => {
//     // console.log(conn.connection);
//     console.log("DB connection successful!");
// });
/** END LOCAL DATABASE CONNECTION */


/** SCHEMA- & MODEL */
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    }
});
// model
const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
    name: "The park camper",
    rating: 4.8,
    price: 700
});
testTour.save().then((doc) => {
    console.log(doc);
}).catch((err) => {
    console.log("ERROR ", err);
});






/** server works */
const port = 3000;
const host = '127.0.0.1';

// console.log(process.env);

app.listen(process.env.PORT, host, () => {
    console.log(`server is running on http://${host}:${port}`);
});