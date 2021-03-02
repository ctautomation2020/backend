module.exports={
    Query:{
        async travel(parent, args, {prisma}, info) {
            return await prisma.person_travel_history.findOne({
                where:{
                    Travel_ID: args.data.Travel_ID
                }
            })
        },
        async persontravelhistorys(parent, args, {prisma}, info) {
            return await prisma.person_travel_history.findMany({
                where:{
                    Person_ID: args.data.Person_ID
                }
            })
        },

    },

    Mutation:{
        async createPersonTravelhistory(parent, {data}, {prisma,auth,req}, info) {
        const { Person_ID,...noref_data} = data
        const ref_data = noref_data
        const Person_ID1 = auth(req,2)
          
            return await prisma.person_travel_history.create({
                data:{
                    person:{
                        connect:{
                            Person_ID:Person_ID1
                        }

                    },
                    ...ref_data
                }
            })
        },
        async updatePersonTravelhistory(parent, {data}, {prisma}, info) {
            const {Travel_ID, ...noref_data} = data
            const ref_data = noref_data
            
            
            return await prisma.person_travel_history.update({
                where:{
                    Travel_ID
                },
                data:{
                    ...ref_data
                }
            })
        },

        async deletePersonTravelhistory(parent, {data}, {prisma}, info) { 
            return await prisma.person_travel_history.delete({
                where:{
                    Travel_ID:data.Travel_ID
                }
            })
        }
    }
}