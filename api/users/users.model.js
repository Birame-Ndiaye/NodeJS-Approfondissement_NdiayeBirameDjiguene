const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");



const userSchema = Schema({
  name: String,
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "member"],
      message: "{VALUE} inconnue",
    },
  },
  age: Number,
});
userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});


module.exports = model("User", userSchema);
