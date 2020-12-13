require("dotenv").config();
const express = require("express");
const cors = require('cors');
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const {typeDefs} = require("./graphql/types");
const {resolvers} = require("./graphql/resolvers");
const cookieParser = require("cookie-parser");
const { dbConnection } = require("./database");


const app = express();
dbConnection();
app.use(cors());
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


app.use(
  "/graphql",
  cookieParser(),
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(5000, () => {
  console.info("server on");
});
