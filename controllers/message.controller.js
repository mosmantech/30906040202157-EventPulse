const Message = require('../models/Message.model');
const AppError = require('../utils/appError');
const asyncHandler = require('../utils/asyncHandler');


exports.sendAnnouncement = asyncHandler(async (req, res, next) => {
    const { eventId, text } = req.body;

    if (!eventId || !text) {
        return next(new AppError('Please provide eventId and text', 400));
    }


    const newMessage = await Message.create({
        event: eventId,
        sender: req.user._id,
        text
    });


    await newMessage.populate('sender', 'name email role');


    const io = req.app.get('io');
    io.to(eventId).emit('announcement', newMessage);

    res.status(201).json({
        status: 'success',
        data: newMessage
    });
});


exports.getAnnouncementsByEvent = asyncHandler(async (req, res, next) => {
    const { eventId } = req.params;

    const messages = await Message.find({ event: eventId })
        .populate('sender', 'name email role')
        .sort('createdAt');

    res.status(200).json({
        status: 'success',
        results: messages.length,
        data: messages
    });
});