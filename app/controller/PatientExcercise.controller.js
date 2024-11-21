const patientExerciseSchema = require('../models/patientExcercise.model'); // Assuming you have the PatientExercise model



exports.CreatePatientExercise = (req, res) => {
    const { patientId, exerciseId, assigned_by, start_date, end_date, status, progress } = req.body;

    const newPatientExercise = new patientExerciseSchema({
        patientId,
        exerciseId,
        assigned_by,
        start_date,
        end_date,
        status,
        progress,
    });

    newPatientExercise.save()
        .then((patientExercise) => res.status(201).json({ message: 'Patient exercise created successfully', patientExercise }))
        .catch((error) => res.status(400).json({ error: error.message }));
};


exports.GetPatientExerciseById = (req, res) => {
    const { patient_exerciseId } = req.params;

    patientExerciseSchema.findOne({ patient_exerciseId })
        .populate('patientId', 'name') // Populate the patient's name from Patient model
        .populate('exerciseId', 'title') // Populate the exercise's title from Exercise model
        .populate('assigned_by', 'name') // Populate the doctor's name from Doctor model
        .then((patientExercise) => {
            if (!patientExercise) return res.status(404).json({ message: 'Patient exercise not found' });
            res.status(200).json({ patientExercise });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};


exports.UpdatePatientExerciseStatus = (req, res) => {
    const { patient_exerciseId } = req.params;
    const { status } = req.body;

    if (!['Ongoing', 'Completed', 'Missed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    patientExerciseSchema.findOneAndUpdate({ patient_exerciseId }, { status }, { new: true })
        .then((updatedPatientExercise) => {
            if (!updatedPatientExercise) return res.status(404).json({ message: 'Patient exercise not found' });
            res.status(200).json({ message: 'Status updated successfully', patientExercise: updatedPatientExercise });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};


exports.UpdatePatientExerciseProgress = (req, res) => {
    const { patient_exerciseId } = req.params;
    const { progress } = req.body;

    patientExerciseSchema.findOneAndUpdate({ patient_exerciseId }, { progress }, { new: true })
        .then((updatedPatientExercise) => {
            if (!updatedPatientExercise) return res.status(404).json({ message: 'Patient exercise not found' });
            res.status(200).json({ message: 'Progress updated successfully', patientExercise: updatedPatientExercise });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};


exports.ListPatientExercises = (req, res) => {
    const { patientId, assigned_by } = req.query; // Optional filters

    const filter = {};
    if (patientId) filter.patientId = patientId;
    if (assigned_by) filter.assigned_by = assigned_by;

    patientExerciseSchema.find(filter)
        .populate('patientId', 'name')
        .populate('exerciseId', 'title')
        .populate('assigned_by', 'name')
        .then((patientExercises) => {
            if (!patientExercises.length) return res.status(404).json({ message: 'No patient exercises found' });
            res.status(200).json({ patientExercises });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};
