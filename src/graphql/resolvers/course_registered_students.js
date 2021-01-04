module.exports = {
    Query:{
        async registered_students(parent, {data}, {prisma}, info) {
            return await prisma.course_registered_students.findMany({
                where:{
                    ...data
                },
                orderBy:{
                    reg_no: "asc"
                }
            })
        }
    },
    course_registered_students: {
        async student(parent, {data}, {prisma}, info) {
            return await prisma.student_list.findOne({
                where:{
                    reg_no: parent.reg_no
                }
            })
        }
    }
}