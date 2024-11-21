const exerciseSchema = require('../models/excercise.model')
const checkAuth = require("../middleware/App.middleware");


exports.CreateExercise = (req, res) => {
    const { exerciseId, title, description, video_url, difficulty_level, target_area, duration_minutes, repetitions } = req.body;

    const newExercise = new  exerciseSchema({
        exerciseId,
        title,
        description,
        video_url,
        difficulty_level,
        target_area,
        duration_minutes,
        repetitions,
    });

    newExercise.save()
        .then((exercise) => res.status(201).json({ message: 'Exercise created successfully', exercise }))
        .catch((error) => res.status(400).json({ error: error.message }));
};

exports.GetExerciseById = (req, res) => {
    const { exerciseId } = req.params;

    exerciseSchema.findOne({ exerciseId })
        .then((exercise) => {
            if (!exercise) return res.status(404).json({ message: 'Exercise not found' });
            res.status(200).json({ exercise });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};


exports.UpdateExercise = (req, res) => {
    const { exerciseId } = req.params;
    const updates = req.body;

    exerciseSchema.findOneAndUpdate({ exerciseId }, updates, { new: true, runValidators: true })
        .then((updatedExercise) => {
            if (!updatedExercise) return res.status(404).json({ message: 'Exercise not found' });
            res.status(200).json({ message: 'Exercise updated successfully', exercise: updatedExercise });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};


exports.DeleteExercise = (req, res) => {
    const { exerciseId } = req.params;

    exerciseSchema.findOneAndDelete({ exerciseId })
        .then((deletedExercise) => {
            if (!deletedExercise) return res.status(404).json({ message: 'Exercise not found' });
            res.status(200).json({ message: 'Exercise deleted successfully' });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};

// List All Exercises
exports.ListExercises = (req, res) => {
    exerciseSchema.find()
        .then((exercises) => {
            if (!exercises.length) return res.status(404).json({ message: 'No exercises found' });
            res.status(200).json({ exercises });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};
