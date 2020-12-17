require("dotenv").config();
const express = require("express");
const cors = require('cors');
const { graphqlHTTP } = require("express-graphql");
//const { ApolloServer } = require("apollo-server");
//const { ApolloServer, gql } = require("apollo-server-express");
const expressPlayground = require("graphql-playground-middleware-express").default;
 
const cookieParser = require("cookie-parser");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const {typeDefs} = require("./graphql/types");
const {resolvers} = require("./graphql/resolvers");
const {context} = require('./graphql/context'); 
const { dbConnection } = require("./database");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
app.use(cors());
dbConnection();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.info("server on");
});


/* const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

const app = express();
app.use(cors({
    credentials: true,
    origin: "*",
  })
);

app.use(cookieParser());



app.use((req, _, next) => {
  console.log(req.headers.cookies);
  /* const token = req.cookies["token"];
  try {
    const data = verify(token, ACCESS_TOKEN_SECRET) as any;
    (req as any).userId = data.userId;
  } catch {} 
  next();
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);*/
 



/* const server = new ApolloServer({
  typeDefs,
  resolvers,
   cors: {
    origin: "*",
    credentials: true,
  },
  context: async ({ req: {headers} }) => {
    console.log(headers);
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
}); */

//----------------------------------------------------------------------------------------------------------


