const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Persona = require("../models/personas");
const Usuarios = require("../models/usuarios");

const resolvers = {
  Query: {
    Usuarios: async () => await Usuarios.find(),
    Personas: async () => await Persona.find(),
  },
  Mutation: {
    register: async (_, { input }) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const newUser = new Usuarios({
        usuario: input.usuario,
        password: hashedPassword,
      });
      try {
        await newUser.save();
      } catch (err) {
        return "error al crear usuario";
      }
      return "usuario creado con exito";
    },
    login: async (_, { input }) => {
      const usuarioDB = await Usuarios.findOne({usuario: input.usuario});
      if (!usuarioDB) {
        return "no existe usuario";
      }
      const validPassword = bcrypt.compareSync(input.password, usuarioDB.password);
      if (!validPassword) {
        return "password no valido";
      }
      const token = await generarJWT(usuarioDB._id);
      return token;
    },
    crearPersona: async (_, { input }) => {
      const newPersona = new Persona(input);
      await newPersona.save();
      return newPersona;
    },
    eliminarPersona: async (_, { _id }) => {
      return await Persona.findByIdAndDelete(_id);
    },
    actualizarPersona: async (_, { _id, input }) => {
      return await Persona.findOneAndUpdate(_id, input, { new: true });
    },
  },
  /*  Author: {
    posts: (author) => filter(posts, { authorId: author.id }),
  },

  Post: {
    author: (post) => find(authors, { id: post.authorId }),
  }, */
};


module.exports = {
    resolvers
}