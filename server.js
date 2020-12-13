const express = require("express");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const expressJWT = require('express-jwt');
const {typeDefs} = require("./graphql/types");
const {resolvers} = require("./graphql/resolvers");
const { dbConnection } = require("./database");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
dbConnection();

app.use(
  expressJWT({
    secret: process.env.SECRETJWT,
    algorithms: ['H5256'],
    credentialsRequired: false
  })
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    context: (ctx) => {
      console.log(ctx);
      const user = ctx.user || null;
      return { user };
    }
  })
);

app.listen(5000, () => {
  console.info("server on");
});
