module.exports = {
    Query: {
        async assesment(parent, {data}, {prisma}, info){
            asses = await prisma.course_assessment.findMany({
                where:{
                    cassess_id: data.cassess_id
                }
            })

        
            
        }
    }
}