
const express = require('express');
const tourController = require("../controllers/tourController");

const router = express.Router();

router.param('id', tourController.checkId);

// ROUTER
/**
 * create a checkBody middleware
 * check if body contains the name and price property
 * if not, send back 400 (bad request)
 * add it to the post handler stack
 */

router.route('/')
.get(tourController.getAllTours)
.post(tourController.checkBody, tourController.createNewTour);

router.route('/:id')
.get(tourController.getTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour);




module.exports = router;