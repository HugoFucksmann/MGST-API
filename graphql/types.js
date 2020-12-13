const typeDefs = `

 type User {
    id: ID
    usuario: String
    password: String
  }

  type Persona {
    _id: ID
    nombre: String!
    apellido: String!
    edad: Int
    fechaNacimiento: String
    contacto: String
    localidad: String
    barrio: String
    direccion: String
    cuitCuil: String
    cbu: String
    organizacion: String
  }

  # the schema allows the following query:
  type Query {
    Usuarios: [User]
    Personas: [Persona]
  }

  input login {
      usuario: String!
      password: String!
  }

  input PersonaInput {
    nombre: String!
    apellido: String!
    edad: Int
    fechaNacimiento: String
    contacto: String
    localidad: String
    barrio: String
    direccion: String
    cuitCuil: String
    cbu: String
    organizacion: String
  }

  # this schema allows the following mutation:
  type Mutation {
    login( input: login ): String
    register( input: login): String
    crearPersona( input: PersonaInput ): String
    eliminarPersona( _id: ID ): String
    actualizarPersona(_id: ID, input: PersonaInput ): String
  }
`;

module.exports = {
  typeDefs,
};