
const express = require('express');
const tourController = require("../controllers/tourController");

const router = express.Router();

// ROUTER
/**
 * create a checkBody middleware
 * check if body contains the name and price property
 * if not, send back 400 (bad request)
 * add it to the post handler stack
 */

router.route('/top-5-cheap')
    .get(tourController.aliasTopCheapTours, tourController.getAllTours);

router.route('/tour-stats')
    .get(tourController.getTourStats);

// BUSINESS LOGIN
router.route('/monthly-plan/:year')
    .get(tourController.getMonthlyPlan);



router.route('/')
    .get(tourController.getAllTours)
    .post(tourController.createNewTour);

router.route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);




module.exports = router;