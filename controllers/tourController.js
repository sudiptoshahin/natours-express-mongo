const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

/** MIDDLEWARE */
exports.checkId = (req, res, next, value) => {
    if(req.params.id * 1 > tours.length) {
        return res.status(400).json({
            status: 'fail',
            message: "Invalid Id"
        });
    }
    next();
};

exports.checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.price) {
        return res.status(400).json({
            'status': 'fail',
            'message': 'Name and price is missing!'
        });
    }
    next();
};


/** MIDDLEWARE ENDS */


exports.getAllTours = (req, res) => {

    console.log(req.requestTime);

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours: tours
        }
    });
};


exports.createNewTour = (req, res) => {
    
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, 
                    JSON.stringify(tours),
                    (err) => {
                        res.status(201).json({
                            status: 'success',
                            data: {
                                tour: newTour
                            }
                        });
    });

};


exports.getTour = (req, res) => {
    // const id = req.params.id * 1;
    // const tour = tours.find((el) => el.id === id);

    // if(!tour) {
    //     return res.status(404).json({
    //         status: 'failed',
    //         message: 'Invalid id'
    //     });
    // }

    res.status(200).json({
        status: 'success',
        data: {
            tours: tour
        }
    });
};

exports.updateTour = (req, res) => {

    // if(req.params.id * 1 > tours.length) {
    //     return res.status(400).json({
    //         status: 'fail',
    //         message: "Invalid Id"
    //     });
    // }

    res.status(200).send({
        status: "success",
        data: {
            tour: "<updated tour is here..!>"
        }
    });
};

exports.deleteTour = (req, res) => {

    // if(req.params.id * 1 > tours.length) {
    //     return res.status(400).json({
    //         status: 'fail',
    //         message: "Invalid Id"
    //     });
    // }

    res.status(204).send({
        status: "success",
        data: null
    });
};