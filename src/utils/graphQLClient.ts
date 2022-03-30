import { GraphQLClient } from 'graphql-request';

const API_URL = `https://graphql-pokemon2.vercel.app`;

export const graphQLClient = new GraphQLClient(API_URL);
