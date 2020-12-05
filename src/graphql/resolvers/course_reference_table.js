module.exports = {
    Query: {
        async courseReference(parent, {data}, {prisma}, info){
            console.log("sergse")
            return await prisma.course_reference_table.findMany({
                where:{
                    ...data
                }
            })
        }
    }
}