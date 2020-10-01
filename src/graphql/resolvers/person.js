
module.exports={
    Query:{

        async allPersons(parent, args, {prisma}, info) {
            return await prisma.person.findMany()
        },

        async person(parent, args, {prisma}, info){
            return await prisma.person.findOne({
                where: {
                    Person_ID: args.data.Person_ID
                }
            })
        }

    },

    Mutation: {
        
        async createPerson(parent, {data}, {prisma}, info) {
            return await prisma.person.create({data})
        }

    },

    Person: {

        async Person_Qualification(parent, {data}, {prisma}, info) {
            return await prisma.person_qualification.findMany({
                where: {
                    Person_ID: parent.Person_ID
                }
            })
        }
    }
}

