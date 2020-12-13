const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  usuario: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

module.exports = model("Usuarios", UserSchema);
