const User = require("../models/User");
const Store = require("../models/Store");
const Rating = require("../models/Rating");

exports.getDashboard = async (req, res) => {

  try {

    const totalUsers = await User.countDocuments();

    const totalStores = await Store.countDocuments();

    const totalRatings = await Rating.countDocuments();


    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalStores,
        totalRatings
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


exports.createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
      role
    } = req.body;


    // Validate role
    const allowedRoles = ["ADMIN", "USER", "OWNER"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role"
      });
    }


    // Check email exists
    const existingUser = await User.findOne({
      email
    });


    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }


    // Create user
    const user = await User.create({
      name,
      email,
      password,
      address,
      role
    });


    res.status(201).json({
      success: true,
      message: `${role} created successfully`,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role
      }
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

exports.getUsers = async (req, res) => {
    try {

        const {
            name,
            email,
            address,
            role,
            sortBy = "createdAt",
            order = "desc"
        } = req.query;


        // Create filter object
        const filter = {};


        if (name) {
            filter.name = {
                $regex: name,
                $options: "i"
            };
        }


        if (email) {
            filter.email = {
                $regex: email,
                $options: "i"
            };
        }


        if (address) {
            filter.address = {
                $regex: address,
                $options: "i"
            };
        }


        if (role) {
            filter.role = role.toUpperCase();
        }


        // Sorting
        const sortOptions = {
            [sortBy]: order === "asc" ? 1 : -1
        };


        // Get users without password
        const users = await User.find(filter)
            .select("-password")
            .sort(sortOptions);


        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

exports.getUserById = async (req, res) => {
    try {

        const { id } = req.params;


        // Find user without password
        const user = await User.findById(id)
            .select("-password");


        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }


        let storeData = null;


        // If user is a Store Owner, fetch store details
        if (user.role === "OWNER") {

            const store = await Store.findOne({
                owner: user._id
            });


            if (store) {
                storeData = {
                    id: store._id,
                    name: store.name,
                    email: store.email,
                    address: store.address,
                    averageRating: store.averageRating
                };
            }
        }


        res.status(200).json({
            success: true,
            data: {
                user,
                store: storeData
            }
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

exports.createStore = async (req, res) => {
    try {

        const {
            name,
            email,
            address,
            ownerId
        } = req.body;


        // Check if store email already exists
        const existingStore = await Store.findOne({
            email
        });

        if (existingStore) {
            return res.status(400).json({
                success: false,
                message: "Store email already exists"
            });
        }


        // Check if owner exists
        const owner = await User.findById(ownerId);

        if (!owner) {
            return res.status(404).json({
                success: false,
                message: "Store owner not found"
            });
        }


        // Validate owner role
        if (owner.role !== "OWNER") {
            return res.status(400).json({
                success: false,
                message: "Selected user is not a store owner"
            });
        }


        // Check if owner already has a store
        const ownerStore = await Store.findOne({
            owner: ownerId
        });

        if (ownerStore) {
            return res.status(400).json({
                success: false,
                message: "This owner already has a store"
            });
        }


        // Create store
        const store = await Store.create({
            name,
            email,
            address,
            owner: ownerId
        });


        res.status(201).json({
            success: true,
            message: "Store created successfully",
            data: {
                id: store._id,
                name: store.name,
                email: store.email,
                address: store.address,
                owner: owner.name,
                averageRating: store.averageRating
            }
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

exports.getStores = async (req, res) => {
    try {

        const {
            name,
            address,
            sortBy = "createdAt",
            order = "desc"
        } = req.query;


        // Create filter
        const filter = {};


        if (name) {
            filter.name = {
                $regex: name,
                $options: "i"
            };
        }


        if (address) {
            filter.address = {
                $regex: address,
                $options: "i"
            };
        }


        // Sorting options
        const sortOptions = {
            [sortBy]: order === "asc" ? 1 : -1
        };


        // Fetch stores with owner details
        const stores = await Store.find(filter)
            .populate({
                path: "owner",
                select: "name email"
            })
            .sort(sortOptions);


        // Format response
        const formattedStores = stores.map(store => ({
            id: store._id,
            name: store.name,
            email: store.email,
            address: store.address,
            averageRating: store.averageRating,
            owner: {
                id: store.owner._id,
                name: store.owner.name,
                email: store.owner.email
            }
        }));


        res.status(200).json({
            success: true,
            count: formattedStores.length,
            data: formattedStores
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};