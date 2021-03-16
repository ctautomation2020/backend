module.exports= {
    Query: {
        async courseDetails(parent, {data}, {prisma}, info) {
            return await prisma.subj_allot.findUnique({
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