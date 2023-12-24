"use client";
import { ApolloClient, InMemoryCache } from '@apollo/client';
const client = new ApolloClient({
  uri: 'process.env.GRAPHQL_API',
  cache: new InMemoryCache(),
});
export default client;