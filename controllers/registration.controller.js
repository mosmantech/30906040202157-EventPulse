const Registration = require('../models/Registration.model');
const Event = require('../models/Event.model');
const AppError = require('../utils/appError');
const asyncHandler = require('../utils/asyncHandler');


exports.registerForEvent = asyncHandler(async (req, res, next) => {
    const { eventId } = req.body;
    const userId = req.user._id;


    const event = await Event.findById(eventId);
    if (!event) {
        return next(new AppError('Event not found', 404));
    }

    // 1) تغيير user إلى attendee
    const existingRegistration = await Registration.findOne({ event: eventId, attendee: userId });
    if (existingRegistration) {
        return next(new AppError('You are already registered for this event', 400));
    }

    const currentRegistrationsCount = await Registration.countDocuments({ event: eventId });
    if (currentRegistrationsCount >= event.capacity) {
        return next(new AppError('Event is full to capacity', 400));
    }

    // 2) تغيير user إلى attendee هنا أيضاً
    const registration = await Registration.create({
        event: eventId,
        attendee: userId
    });

    res.status(201).json({
        status: 'success',
        data: registration
    });
});


exports.cancelRegistration = asyncHandler(async (req, res, next) => {
    // 3) تغيير user إلى attendee
    const registration = await Registration.findOneAndDelete({
        _id: req.params.id,
        attendee: req.user._id
    });

    if (!registration) {
        return next(new AppError('Registration not found or unauthorized', 404));
    }

    res.status(200).json({
        status: 'success',
        data: null
    });
});


exports.getMyRegistrations = asyncHandler(async (req, res, next) => {
    // 4) تغيير user إلى attendee
    const registrations = await Registration.find({ attendee: req.user._id })
        .populate({
            path: 'event',
            select: 'title date city venue capacity'
        });

    res.status(200).json({
        status: 'success',
        results: registrations.length,
        data: registrations
    });
});