const { ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');
const gql = require('graphql-tag');

const typeDefs = require('./graphql/typeDefs');
const  resolvers = require('./graphql/resolvers');

const { MONGODB } = require('./config/index.js')

const server = new ApolloServer(
    {
    typeDefs,
    resolvers,
    context: ({req}) =>({req})
});

mongoose.connect(MONGODB,{
    useNewUrlParser: true,
}).then(() => {
    console.log('Connected to Mongo');
    return server.listen({port: 3005});
}).then((res) => {
    console.log(`Server listening at ${res.url}`)
});

