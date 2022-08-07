const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRouter');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// MIDDLEWARES
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});


app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'Fail',
    //     message: `Can't find the url ${req.originalUrl} in this server!`
    // });
    // const err = new Error(`haha Can't find the url ${req.originalUrl} in this server!`);
    // err.statusCode = 404;
    // err.status = 'failed';
    // next(err);
    next(new AppError(`OHH Can't find the url ${req.originalUrl} in this server!`, 404));
});

//   ERROR HANDLING
app.use(globalErrorHandler);

module.exports = app;