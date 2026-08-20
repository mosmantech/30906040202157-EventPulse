const Event = require('../models/Event.model');
const AppError = require('../utils/appError');
const asyncHandler = require('../utils/asyncHandler');


exports.getAllEvents = asyncHandler(async (req, res, next) => {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'search', 'sortBy', 'order', 'startDate', 'endDate'];
    excludedFields.forEach(el => delete queryObj[el]);


    if (req.query.startDate || req.query.endDate) {
        queryObj.date = {};
        if (req.query.startDate) queryObj.date.$gte = new Date(req.query.startDate);
        if (req.query.endDate) queryObj.date.$lte = new Date(req.query.endDate);
    }


    if (req.query.search) {
        queryObj.$or = [
            { title: { $regex: req.query.search, $options: 'i' } },
            { description: { $regex: req.query.search, $options: 'i' } }
        ];
    }

    let query = Event.find(queryObj);


    if (req.query.sortBy) {
        const allowedSortFields = ['date', 'createdAt'];
        const sortBy = allowedSortFields.includes(req.query.sortBy) ? req.query.sortBy : 'createdAt';
        const order = req.query.order === 'desc' ? '-' : '';
        query = query.sort(`${order}${sortBy}`);
    } else {
        query = query.sort('-createdAt');
    }


    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const total = await Event.countDocuments(queryObj);
    const totalPages = Math.ceil(total / limit);

    query = query.skip(skip).limit(limit);


    query = query.populate('category', 'name description').populate('organizer', 'name email role');

    const events = await query;

    res.status(200).json({
        status: 'success',
        total,
        page,
        limit,
        totalPages,
        data: events
    });
});


exports.getEventById = asyncHandler(async (req, res, next) => {
    const event = await Event.findById(req.params.id)
        .populate('category', 'name description')
        .populate('organizer', 'name email role');

    if (!event) {
        return next(new AppError('Event not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: event
    });
});


exports.createEvent = asyncHandler(async (req, res, next) => {
    const { title, description, category, date, city, venue, capacity } = req.body;

    const event = await Event.create({
        title,
        description,
        category,
        date,
        city,
        venue,
        capacity,
        organizer: req.user._id
    });

    res.status(201).json({
        status: 'success',
        data: event
    });
});


exports.updateEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!event) {
        return next(new AppError('Event not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: event
    });
});


exports.deleteEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
        return next(new AppError('Event not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: null
    });
});