const express = require('express');
const router = express.Router();
const MessageController = require('../controller/Message.controller');
const checkAuth = require("../middleware/App.middleware");

// Create Message
router.post('/', checkAuth, MessageController.CreateMessage);

// Get Message by ID
router.get('/:messageId', checkAuth, MessageController.GetMessageById);

// List Messages by sender or receiver
router.get('/', checkAuth, MessageController.ListMessages);

// Update Message
router.patch('/:messageId', checkAuth, MessageController.UpdateMessage);

// Delete Message
router.delete('/:messageId', checkAuth, MessageController.DeleteMessage);

module.exports = router;
