const Store = require("../models/Store");
const Rating = require("../models/Rating");


exports.getDashboard = async (req, res) => {
    try {

        // Find store belonging to logged-in owner
        const store = await Store.findOne({
            owner: req.user.id
        });


        if (!store) {
            return res.status(404).json({
                success: false,
                message: "Store not found for this owner"
            });
        }


        // Get all ratings with user details
        const ratings = await Rating.find({
            store: store._id
        })
        .populate({
            path: "user",
            select: "name email"
        });


        // Format response
        const ratedUsers = ratings.map(item => ({
            userId: item.user._id,
            name: item.user.name,
            email: item.user.email,
            rating: item.rating
        }));


        res.status(200).json({
            success: true,
            data: {
                store: {
                    id: store._id,
                    name: store.name,
                    address: store.address,
                    averageRating: store.averageRating
                },
                totalRatings: ratings.length,
                ratedUsers
            }
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};