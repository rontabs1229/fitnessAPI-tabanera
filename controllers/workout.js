const Workout = require("../models/Workout");
const {errorHandler} = require('../auth');
const mongoose = require('mongoose');


module.exports.addUserWorkout = (req, res) => {

	let newWorkout = new Workout({
		userId: req.user.id,
		name: req.body.name,
		duration: req.body.duration
	});

	return newWorkout.save()
	.then(result => res.status(201).send(result))
	.catch(error => errorHandler(error, req, res));
};

module.exports.getUserWorkouts = (req, res) => {
	return Workout.find({ userId: req.user.id })
	.then(workouts => {
		// Always return 200 OK with the array (even if empty)
		return res.status(200).send({ workouts: workouts });
	})
	.catch(error => errorHandler(error, req, res));
};

module.exports.updateUserWorkout = (req, res) => {
	let updatedWorkout = {
		name: req.body.name,
		duration: req.body.duration
	};

	return Workout.findByIdAndUpdate(req.params.workoutId, updatedWorkout)
	.then(workout => {
		if(workout) {
			res.status(200).send({
				message: "Workout updated successfully",
				updatedWorkout: workout
			});
		} else {
			return res.status(404).send({
				message: "Workout not found"
			});
		}
	})
	.catch(error => errorHandler(error, req, res));
};

module.exports.deleteUserWorkout = (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.workoutId)) {
        return res.status(404).send({ message: 'Workout not found' });
    }
    return Workout.findById(req.params.workoutId)
    .then(workout => {
        if (!workout) {
            return res.status(404).send({ message: 'Workout not found' });
        }
        return workout.deleteOne()
        .then(() => {
            return res.status(200).send({ message: 'Workout deleted successfully' });
        });
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.updateWorkoutStatus = (req, res) => {
	let updatedStatusField = {
		status: "completed"
	};
	return Workout.findById(req.params.workoutId)
	.then(workout => {
		if (workout) {
			if (workout.status === "completed") {
				return res.status(200).send({
					message: "Workout is already completed"
				});
			} else {
				return Workout.findByIdAndUpdate(req.params.workoutId, updatedStatusField, { new: true })
				.then(result => res.status(200).send({
					message: "Workout status updated successfully",
					result
				}))
				.catch(error => errorHandler(error, req, res));
			}
		} else {
			return res.status(404).send({
				message: "Workout not found"
			});
		}
	})
	.catch(error => errorHandler(error, req, res));
};