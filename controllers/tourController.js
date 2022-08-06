const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

/** MIDDLEWARE */
//  TOUR ALIAS
exports.aliasTopCheapTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingAverage,price';
    req.query.fields = 'name,price,ratingAverage,summary,difficulty';

    next();
}


/** MIDDLEWARE ENDS */




exports.getAllTours = async (req, res) => {

    try {
        console.log('req.qury ', req.query);
        // 1. Filering
        // BUILD QUERY
        const queryObj = {...req.query};
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((el) => { delete queryObj[el] });

        //2. Advance query string
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        console.log(JSON.parse(queryStr));

        var query = Tour.find(JSON.parse(queryStr));
        
        // 3. SORTING
        if(req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            console.log(sortBy);

            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }


        // 4 FIELD LIMITING
        if(req.query.fields) {
            console.log('query-fields: ', req.query.fields);
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            // exclude '__v' fields
            query = query.select('-__v');
        }

        // 5 PAGE LIMIT
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        if(req.query.page) {
            const numTours = await Tour.countDocuments();
            if(skip >= numTours) throw new Error("This page does not exist");
        }



        // EXECUTE QUERY
        const tours = await query;

        // const tours = await Tour.find({
        //     duration: 5,
        //     difficulty: "easy"
        // });
        // const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals("easy");
        // EXECUTE QUERY

        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            results: tours.length,
            data: {
                tours
            }
        });
    } catch(err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};


exports.createNewTour = async (req, res) => {
    // const newTour = new Tour({});
    // newTour.save();

    // Tour.create({}).then();

    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: newTour
        });
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            // message: err
            message: "Invalid data sent"
        });
    }
};


exports.getTour = async (req, res) => {

    try {
        const tour = await Tour.findById(req.params.id);
        // const tour = await Tour.findOne({ _id: req.params.id });

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch(err) {
        res.status(404).json({
            status: 'fail',
            // message: err
            message: "Data not found"
        });
    }

};

exports.updateTour = async (req, res) => {

    try {

        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            // always fill the upsert to true
            setDefaultsOnInsert: true
        });

        res.status(200).send({
            status: "success",
            data: {
                tour
            }
        });
    } catch(err) {
        res.status(404).json({
            status: 'fail',
            // message: err
            message: err
        });
    }


};

exports.deleteTour = async (req, res) => {

    try {
        const tour = await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: "success",
            data: null
        });
    } catch(err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};