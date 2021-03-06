module.exports= {
    Query: {
        async course(parent, {data}, {prisma}, info) {
            return await prisma.course_list.findUnique({
                where:{
                    course_code: data.course_code
                }
            })
        },
        async allCourses(parent, {data}, {prisma}, info) {
            return await prisma.course_list.findMany()
        },

    }
}