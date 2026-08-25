const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workout");
const auth = require("../auth");

const { userVerification } = auth;

router.post('/addWorkout', userVerification, workoutController.addUserWorkout);
router.get('/getMyWorkouts', userVerification, workoutController.getUserWorkouts);

// Stretch Goal
router.patch('/updateWorkout/:workoutId', userVerification, workoutController.updateUserWorkout);

router.delete('/deleteWorkout/:workoutId', userVerification, workoutController.deleteUserWorkout);

router.patch('/completeWorkoutStatus/:workoutId', userVerification, workoutController.updateWorkoutStatus);

module.exports = router