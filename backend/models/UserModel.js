const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String, 
      required: [true, "Name is required"],
      minlength: 2, 
      maxlength: 20,
      trim: true,
    },
    family: {
      type: String,
      required: [true, "Family is required"],
      minlength: 2,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, 
      lowercase: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // 1. Passwords won't be returned in queries by default
    },
    role: {
      type: String,
      enum: ["user", "admin"], 
      default: "user", // 2. No need for 'required' when there is a default
    },
    passwordResetToken: String,
    passwordResetExpires: Date
  },
  { timestamps: true } // 3. Automatically adds createdAt and updatedAt
);

// Exporting the model
exports.UserModel = model("UserModel", UserSchema);