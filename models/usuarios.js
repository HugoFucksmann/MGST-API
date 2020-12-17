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

UserSchema.method("toJSON", function () {
  const { __v, password, ...Object } = this.toObject();
  return Object;
});

module.exports = model("Usuarios", UserSchema);
