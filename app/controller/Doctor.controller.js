const doctorSchema =require('../models/doctor.model')
const checkAuth = require("../middleware/App.middleware");


exports.CreateDoctor = (req, res) => {
    const doctorId = req.user._id; // Extract doctorId from authenticated user

    const { specialization, license_number, experience_years, bio, availability } = req.body;

    const newDoctor = new doctorSchema({
        doctorId,
        specialization,
        license_number,
        experience_years,
        bio,
        availability
    });

    newDoctor.save()
        .then((doctor) => res.status(201).json({ message: 'Doctor created successfully', doctor }))
        .catch((error) => res.status(400).json({ error: error.message }));
};


exports.GetDoctor = (req, res) => {
    const doctorId = req.user._id; // Extract doctorId from authenticated user

    doctorSchema.findOne({ doctorId })
        .then((doctor) => {
            if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
            res.status(200).json(doctor);
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};




exports.UpdateDoctor = (req, res) => {
    const doctorId = req.user._id; // Extract doctorId from authenticated user

    const updates = req.body;

    doctorSchema.findOneAndUpdate({ doctorId }, updates, { new: true })
        .then((updatedDoctor) => {
            if (!updatedDoctor) return res.status(404).json({ message: 'Doctor not found' });
            res.status(200).json({ message: 'Doctor updated successfully', doctor: updatedDoctor });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};



exports.DeleteDoctor = (req, res) => {
    const doctorId = req.user._id; // Extract doctorId from authenticated user

    doctorSchema.findOneAndDelete({ doctorId })
        .then((deletedDoctor) => {
            if (!deletedDoctor) return res.status(404).json({ message: 'Doctor not found' });
            res.status(200).json({ message: 'Doctor deleted successfully', doctor: deletedDoctor });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};
