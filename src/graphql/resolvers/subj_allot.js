module.exports= {
    Query: {
        async courseDetails(parent, {data}, {prisma}, info) {
            return await prisma.subj_allot.findOne({
                where:{
                    sallot_id: data.sallot_id
                }
            })
        },
        async staffCourses(parent, {data}, {prisma}, info) {
            return await prisma.subj_allot.findMany({
                where:{
                    ...data
                }
            })
        },
        
    }
}