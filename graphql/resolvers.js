const bcrypt = require('bcryptjs');
const { generarJWT, verificarJWT } = require("../helpers/jwt");
const Persona = require("../models/personas");
const Usuarios = require("../models/usuarios");

const resolvers = {
  Query: {
    Usuarios: async (_, args, ctx) => await Usuarios.find(),
    Personas: async (_, args, ctx) => {
      verificarJWT(ctx);
      await Persona.find();
    },
    Usuario: async (_, args, ctx ) => {
      const uid = verificarJWT(ctx);
      if(uid){
        const user = await Usuarios.findById(uid);
        return user;  
      }
      return null;
    },
  },
  Mutation: {
    register: async (_, { input }, { res }) => {
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
    login: async (_, { input }, ctx) => {    
      
      const usuarioDB = await Usuarios.findOne({ usuario: input.usuario });
      if (!usuarioDB) {
        return { msg: "no existe usuario", autenticated: false };
      }
      const validPassword = bcrypt.compareSync(
        input.password,
        usuarioDB.password
      );
      if (!validPassword) {
        return { msg: "password no valido", autenticated: false };
      }
      const token = await generarJWT(usuarioDB._id);
      return {
        msg: "login ok!",
        autenticated: true,
        token
      };
    },
    crearPersona: async (_, { input }, ctx) => {
      if (verificarJWT(ctx)) {
        const newPersona = new Persona(input);
        await newPersona.save();
        return "creado !";
      } else {
        return "token no valido";
      }
    },
    eliminarPersona: async (_, { _id }, ctx) => {
      if (verificarJWT(ctx)) {
        await Persona.findByIdAndDelete(_id);
        return "eliminado !";
      } else {
        return "token no valido";
      }
    },
    actualizarPersona: async (_, { _id, input }, ctx) => {
      if (verificarJWT(ctx)) {
        await Persona.findOneAndUpdate(_id, input, { new: true });
        return "actualizado !";
      } else {
        return "token no valido";
      }
    },
  },
};


module.exports = {
    resolvers
}