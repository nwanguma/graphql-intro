const { GraphQLServer } = require("graphql-yoga");

const users = [
  {
    id: "1",
    name: "Tochukwu Nwanguma",
    age: 28,
    isEmployed: false,
    GPA: 4.33,
    posts: ["2"],
  },
  {
    id: "2",
    name: "Sarah Poulsen",
    age: 24,
    isEmployed: true,
    GPA: 4.33,
    posts: ["1"],
  },
  {
    id: "3",
    name: "Rafa Nadal",
    age: 22,
    isEmployed: true,
    GPA: 4.33,
    posts: ["3"],
  },
];

const posts = [
  {
    id: "2",
    title: "A boy and the river",
    pages: 23,
    author: "2",
  },
  {
    id: "1",
    title: "The river island",
    pages: 73,
    author: "1",
  },
  {
    id: "3",
    title: "Men at war",
    pages: 89,
    author: "2",
  },
];

const typeDefs = `
  type Query {
    users (query: String): [User!]!
    posts (query: String): [Post!]!
    me: User!
  }
  
  type User {
    id: ID!
    name: String!
    age: Int!
    isEmployed: Boolean!
    GPA: Float
    posts: [Post!]!
  }

  type Post {
    title: String!
    pages: Int!
    author: User!
  }
`;

const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (args.query) {
        return users.filter((user) => {
          return user.id === args.query;
        });
      } else {
        return users;
      }
    },
    me() {
      return {
        id: "1",
        name: "Tochukwu Nwanguma",
        age: 28,
        isEmployed: true,
        GPA: 4.33,
      };
    },
    posts(parent, args, ctx, info) {
      if (args.query) {
        return posts.filter((post) => {
          return post.id === args.query;
        });
      } else {
        return posts;
      }
    },
  },
  Post: {
    author(parent, args, context, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
  },
  User: {
    posts(parent, args, context, info) {
      return posts.filter((post) => {
        return post.id === parent.id;
      });
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("Server is up and running!");
});
