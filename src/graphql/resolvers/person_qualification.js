module.exports = {
    Query: {
        async qualification(parent, args, {prisma}, info) {
            return await prisma.person_qualification.findOne({
                where:{
                    Qualification_ID: args.data.Qualification_ID
                }
            })
        },

        async personQualifications(parent, args, {prisma}, info) {
            return await prisma.person_qualification.findMany({
                where:{
                    Person_ID: args.data.Person_ID
                }
            })
        }
    },

    Mutation: {
        async createPersonQualification(parent, {data}, {prisma}, info) {
            const {Person_ID, ...mydata} = data
            return await prisma.person_qualification.create({
                data:{
                    person:{
                        connect:{
                            Person_ID:data.Person_ID
                        }
                    },
                    ...mydata
                }
            })
        }
    }
}