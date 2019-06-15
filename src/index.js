const { GraphQLServer } = require("graphql-yoga");
const Mutation = require("./Mutation");

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query: {
      hello() {
        return "hello world";
      }
    },
    Mutation
  }
});

server.start(() => console.log("Server is running on http://localhost:4000"));
