const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
      maxlength: 60
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email"
      ]
    },

    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/,
        "Password must be 8-16 characters with one uppercase and one special character"
      ]
    },

    address: {
      type: String,
      required: true,
      maxlength: 400,
      trim: true
    },

    role: {
      type: String,
      enum: ["ADMIN", "USER", "OWNER"],
      default: "USER"
    }
  },
  {
    timestamps: true
  }
);


// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(
    this.password,
    salt
  );
});


// Compare password during login
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model("User", userSchema);