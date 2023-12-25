"use client";
import { ApolloClient, InMemoryCache } from '@apollo/client';
const client = new ApolloClient({
  uri: 'https://qvote.onrender.com/',
  // uri: process.env.GRAPHQL_API,
  cache: new InMemoryCache(),
});
export default client;