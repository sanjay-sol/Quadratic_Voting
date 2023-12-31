"use client";
import dotenv from 'dotenv';
dotenv.config();
import { ApolloClient, InMemoryCache } from '@apollo/client';
const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
  cache: new InMemoryCache(),
});
export default client;