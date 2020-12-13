const { Schema, model } = require("mongoose");

const PersonaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    edad: Number,
    fechaNacimiento: String,
    contacto: String,
    localidad: String,
    barrio: String,
    direccion: String,
    cuitCuil: String,
    cbu: String,
    organizacion: String
})

module.exports = model("Persona", PersonaSchema);