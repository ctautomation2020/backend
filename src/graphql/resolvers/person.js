const { PrismaClient } = require("@prisma/client")
module.exports={
    Query:{

        async allPersons(parent, args, {prisma}, info) {
            return await prisma.person.findMany()
        },

        async person(parent, args, {prisma}, info){
            return await prisma.person.findOne({
                where: {
                    id: args.data.id
                }
            })
        }

    },

    Mutation: {
        
        async createPerson(parent, {data}, {prisma}, info) {
            return await prisma.person.create({data})
        }

    }
}

