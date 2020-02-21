const db = require("../models");
const mongoose = require("mongoose");

String.prototype.toObjectId = function() {
    var ObjectId = (mongoose.Types.ObjectId);
    return new ObjectId(this.toString());
};

module.exports = function(app) {

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

    app.post("/api/workouts", function(req, res) {
        const workout = new db.Workout();
        db.Workout.create(workout)
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            })
    });

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