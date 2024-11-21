const consultationSchema = require('../models/consultation.model');

exports.CreateConsultation = (req, res) => {
    const { consultationId, patientId, doctorId, appointmentId, notes, prescriptions, video_recording } = req.body;

    const newConsultation = new consultationSchema({
        consultationId,
        patientId,
        doctorId,
        appointmentId,
        notes,
        prescriptions,
        video_recording,
    });

    newConsultation.save()
        .then((consultation) => res.status(201).json({ message: 'Consultation created successfully', consultation }))
        .catch((error) => res.status(400).json({ error: error.message }));
};


exports.GetConsultationById = (req, res) => {
    const { consultationId } = req.params;

    consultationSchema.findOne({ consultationId })
        .populate('patientId', 'name')  // Replace 'name' with the fields you want to populate
        .populate('doctorId', 'name')
        .populate('appointmentId')
        .then((consultation) => {
            if (!consultation) return res.status(404).json({ message: 'Consultation not found' });
            res.status(200).json({ consultation });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};


exports.UpdateConsultation = (req, res) => {
    const { consultationId } = req.params;
    const updates = req.body;

    consultationSchema.findOneAndUpdate({ consultationId }, updates, { new: true })
        .then((updatedConsultation) => {
            if (!updatedConsultation) return res.status(404).json({ message: 'Consultation not found' });
            res.status(200).json({ message: 'Consultation updated successfully', consultation: updatedConsultation });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};


exports.DeleteConsultation = (req, res) => {
    const { consultationId } = req.params;

    consultationSchema.findOneAndDelete({ consultationId })
        .then((deletedConsultation) => {
            if (!deletedConsultation) return res.status(404).json({ message: 'Consultation not found' });
            res.status(200).json({ message: 'Consultation deleted successfully' });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};


exports.ListConsultations = (req, res) => {
    const { consultationId, patientId, doctorId, appointmentId } = req.query;

    const filter = {};
    if (consultationId) filter.consultationId = consultationId;
    if (patientId) filter.patientId = patientId;
    if (doctorId) filter.doctorId = doctorId;
    if (appointmentId) filter.appointmentId = appointmentId;

    consultationSchema.find(filter)
        .populate('patientId', 'name') // Replace 'name' with the fields you want to populate
        .populate('doctorId', 'name')
        .populate('appointmentId')
        .then((consultations) => {
            if (!consultations.length) return res.status(404).json({ message: 'No consultations found' });
            res.status(200).json({ consultations });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};
