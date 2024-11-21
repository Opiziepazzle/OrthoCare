const messageSchema = require('../models/message.model');
const checkAuth = require('../middleware/App.middleware');

exports.CreateMessage = (req, res) => {
    const senderId = req.user._id; // Extract senderId from authenticated user
    const { messageId, receiverId, message } = req.body;

    const newMessage = new messageSchema({
        messageId,
        senderId,
        receiverId,
        message,
    });

    newMessage.save()
        .then((message) => res.status(201).json({ message: 'Message sent successfully', message }))
        .catch((error) => res.status(400).json({ error: error.message }));
};


exports.GetMessageById = (req, res) => {
    const { messageId } = req.params;

    messageSchema.findOne({ messageId })
        .populate('senderId', 'name') // Replace 'name' with desired fields
        .populate('receiverId', 'name')
        .then((message) => {
            if (!message) return res.status(404).json({ message: 'Message not found' });
            res.status(200).json({ message });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};


exports.ListMessages = (req, res) => {
    const userId = req.user._id; // Extract userId from authenticated user
    const { filterType } = req.query; // filterType can be 'sent' or 'received'

    const filter = {};
    if (filterType === 'sent') filter.senderId = userId;
    else if (filterType === 'received') filter.receiverId = userId;

    messageSchema.find(filter)
        .sort({ timestamp: -1 }) // Sort by most recent messages
        .populate('senderId', 'name')
        .populate('receiverId', 'name')
        .then((messages) => {
            if (!messages.length) return res.status(404).json({ message: 'No messages found' });
            res.status(200).json({ messages });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};



exports.UpdateMessage = (req, res) => {
    const userId = req.user._id; // Extract userId from authenticated user
    const { messageId } = req.params;
    const updates = req.body;

    messageSchema.findOneAndUpdate({ messageId, senderId: userId }, updates, { new: true })
        .then((updatedMessage) => {
            if (!updatedMessage) return res.status(404).json({ message: 'Message not found or unauthorized' });
            res.status(200).json({ message: 'Message updated successfully', message: updatedMessage });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};


exports.DeleteMessage = (req, res) => {
    const userId = req.user._id; // Extract userId from authenticated user
    const { messageId } = req.params;

    messageSchema.findOneAndDelete({ messageId, senderId: userId })
        .then((deletedMessage) => {
            if (!deletedMessage) return res.status(404).json({ message: 'Message not found or unauthorized' });
            res.status(200).json({ message: 'Message deleted successfully' });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};
