module.exports={

    Query:{
        async course_topic(parent, {data}, {prisma}, info){
            return await prisma.course_topic.findMany({
                where:{
                    ...data
                }
            })
        }
    }
}