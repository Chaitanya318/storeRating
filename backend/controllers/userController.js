const User = require("../models/User");
const Store = require("../models/Store");
const Rating = require("../models/Rating");

const updateStoreAverageRating = async (storeId) => {
  const ratings = await Rating.find({
    store: storeId,
  });

  const totalRatings = ratings.length;

  if (totalRatings === 0) {
    await Store.findByIdAndUpdate(storeId, {
      averageRating: 0,
    });

    return;
  }

  const total = ratings.reduce((sum, item) => {
    return sum + item.rating;
  }, 0);

  const average = total / totalRatings;

  await Store.findByIdAndUpdate(storeId, {
    averageRating: Number(average.toFixed(1)),
  });
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Get current logged-in user
    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify old password
    const isMatch = await user.comparePassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    // Update password
    user.password = newPassword;

    // Triggers pre-save middleware and hashes password
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getStores = async (req, res) => {
  try {
    const { name, address, sortBy = "createdAt", order = "desc" } = req.query;

    // Create filter
    const filter = {};

    if (name) {
      filter.name = {
        $regex: name,
        $options: "i",
      };
    }

    if (address) {
      filter.address = {
        $regex: address,
        $options: "i",
      };
    }

    // Sorting
    const sortOptions = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    // Get stores
    const stores = await Store.find(filter).sort(sortOptions);

    // Add current user's rating for each store
    const result = await Promise.all(
      stores.map(async (store) => {
        const userRating = await Rating.findOne({
          user: req.user.id,
          store: store._id,
        });

        return {
          id: store._id,
          name: store.name,
          address: store.address,
          overallRating: store.averageRating,
          submittedRating: userRating ? userRating.rating : null,

          ratingId: userRating ? userRating._id : null,
        };
      }),
    );

    res.status(200).json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;

    // Validate rating value
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Check store exists
    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    // Prevent duplicate rating
    const existingRating = await Rating.findOne({
      user: req.user.id,
      store: storeId,
    });

    if (existingRating) {
      return res.status(400).json({
        success: false,
        message: "You already rated this store. Please update your rating.",
      });
    }

    // Create rating
    const newRating = await Rating.create({
      user: req.user.id,
      store: storeId,
      rating,
    });

    // Update average rating
    await updateStoreAverageRating(storeId);

    res.status(201).json({
      success: true,
      message: "Rating submitted successfully",
      data: {
        id: newRating._id,
        rating: newRating.rating,
        store: storeId,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Find rating
    const existingRating = await Rating.findById(id);

    if (!existingRating) {
      return res.status(404).json({
        success: false,
        message: "Rating not found",
      });
    }

    // Check ownership
    if (existingRating.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to modify this rating",
      });
    }

    // Update rating
    existingRating.rating = rating;

    await existingRating.save();

    // Update store average rating
    await updateStoreAverageRating(existingRating.store);

    res.status(200).json({
      success: true,
      message: "Rating updated successfully",
      data: {
        id: existingRating._id,
        store: existingRating.store,
        rating: existingRating.rating,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
