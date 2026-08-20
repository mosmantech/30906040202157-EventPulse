const Event = require('../models/Event.model');
const User = require('../models/User.model');
const Registration = require('../models/Registration.model');
const asyncHandler = require('../utils/asyncHandler');


exports.getAdminStats = asyncHandler(async (req, res, next) => {
    const totalUsers = await User.countDocuments();
    const totalEvents = await Event.countDocuments();
    const totalRegistrations = await Registration.countDocuments();

    
    const eventsByCategory = await Event.aggregate([
        {
            $group: {
                _id: '$category',
                totalEvents: { $sum: 1 }
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: '_id',
                foreignField: '_id',
                as: 'categoryInfo'
            }
        },
        { $unwind: '$categoryInfo' },
        {
            $project: {
                _id: 0,
                categoryName: '$categoryInfo.name',
                totalEvents: 1
            }
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            totalUsers,
            totalEvents,
            totalRegistrations,
            eventsByCategory
        }
    });
});