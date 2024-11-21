const appointmentSchema = require('../models/appointment.model'); // Assuming you have the Appointment model
const checkAuth = require("../middleware/App.middleware");


exports.CreateAppointment = (req, res) => {
    const { patientId, doctorId, appointment_date, consultation_mode, status } = req.body;

    const newAppointment = new appointmentSchema({
        patientId,
        doctorId,
        appointment_date,
        consultation_mode,
        status,
    });

    newAppointment.save()
        .then((appointment) => res.status(201).json({ message: 'Appointment created successfully', appointment }))
        .catch((error) => res.status(400).json({ error: error.message }));
};


exports.CheckAppointmentSlot = (req, res) => {
    const { doctorId, appointment_date } = req.body;  // Doctor's ID and the requested appointment date

    // Check if the doctor is already booked at this time
    appointmentSchema.findOne({ doctorId, appointment_date })
        .then((existingAppointment) => {
            if (existingAppointment) {
                return res.status(400).json({ message: 'Doctor is not available at this time.' });
            }
            res.status(200).json({ message: 'Slot is available!' });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};


exports.GetAppointmentById = (req, res) => {
    const { appointmentId } = req.params;

    appointmentSchema.findOne({ appointmentId })
        .populate('patientId', 'name')  // Populate with patient details
        .populate('doctorId', 'name')   // Populate with doctor details
        .then((appointment) => {
            if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
            res.status(200).json({ appointment });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};


exports.GetAppointmentById = (req, res) => {
    const { appointmentId } = req.params;

    appointmentSchema.findOne({ appointmentId })
        .populate('patientId', 'name')  // Populate with patient details
        .populate('doctorId', 'name')   // Populate with doctor details
        .then((appointment) => {
            if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
            res.status(200).json({ appointment });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};


exports.UpdateAppointmentStatus = (req, res) => {
    const { appointmentId } = req.params;
    const { status } = req.body;  // New status (e.g., Completed, Cancelled)

    if (!['Scheduled', 'Completed', 'Cancelled'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    appointmentSchema.findOneAndUpdate({ appointmentId }, { status }, { new: true })
        .then((updatedAppointment) => {
            if (!updatedAppointment) return res.status(404).json({ message: 'Appointment not found' });
            res.status(200).json({ message: 'Appointment status updated successfully', appointment: updatedAppointment });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};


exports.ListAppointments = (req, res) => {
    const { patientId, doctorId, status } = req.query; // Optional filters

    const filter = {};
    if (patientId) filter.patientId = patientId;
    if (doctorId) filter.doctorId = doctorId;
    if (status) filter.status = status;

    appointmentSchema.find(filter)
        .populate('patientId', 'name')
        .populate('doctorId', 'name')
        .then((appointments) => {
            if (!appointments.length) return res.status(404).json({ message: 'No appointments found' });
            res.status(200).json({ appointments });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};
