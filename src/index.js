import {ApolloServer, gql} from 'apollo-server'

import {readFileSync} from 'fs'
import {join} from 'path'

import getPersonID from './graphql/auth/getPersonID'
import resolvers from './graphql/index'

const { PrismaClient } = require("@prisma/client")


const prisma = new PrismaClient()

const server = new ApolloServer({
  typeDefs: gql(readFileSync(join(__dirname, "../schema.graphql"), "utf8")),
  resolvers,
  context: async ({ req }) => ({
    prisma: prisma,
    auth: getPersonID,
    req
  })
})

server.listen({port: process.env.PORT||4000},()=>{
  console.log("server is up")
})
 //