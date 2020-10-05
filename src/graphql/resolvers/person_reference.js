module.exports = {
    Query: {
        async personReference(parent, {data}, {prisma}, info){
            return await prisma.person_reference_table.findMany({
                where:{
                    ...data
                }
            })
        }
    }
}