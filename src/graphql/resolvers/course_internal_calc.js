module.exports = {
    Query:{
        async internal_calc(parent, {data}, {prisma}, info) {
            return await prisma.course_registered_students.findMany({
                where:{
                    ...data
                }
            })
        }
    }
}