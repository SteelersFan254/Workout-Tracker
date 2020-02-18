//Require model
const db = require("../models");
const mongoose = require("mongoose");

String.prototype.toObjectId = function() {
    var ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
};



//Routes for API workout
module.exports = function(app) {

    //GET route for all of the workouts
    app.get("/api/workouts", function(req, res) {
        db.Workout.find({})
            .sort({ "day": 1 })
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            })
    });

    //POST route to post into workouts
    app.post("/api/workouts", function(req, res) {
        const workout = new db.Workout();
        // workout.getTotalDuration();
        db.Workout.create(workout)
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            })
    });


    //PUT route for new exercises added to workout
    app.put("/api/workouts/:id", function(req, res) {
        console.log(req.body);
        db.Workout.update({
                _id: req.params.id.toObjectId()
            }, {
                $push: { exercises: req.body }
            })
            .then(function(data) {
                res.json(data);
            })
    });

    //GET workout data from a specific range
    app.get("/api/workouts/range", function(req, res) {
        db.Workout.find({})
            .sort({ "day": 1 })
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            })
    });
}