module.exports = {
    Query: {
        async courseReference(parent, {data}, {prisma}, info){
            
            return await prisma.course_reference_table.findMany({
                where:{
                    ...data
                }
            })
        }
    }
}