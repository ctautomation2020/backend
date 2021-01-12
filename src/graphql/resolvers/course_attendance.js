module.exports={
    Query:{
        async attendance(parent, {data}, {prisma}, info) {
            return await prisma.course_attendance.findMany({
                where:{
                    ...data
                },
                orderBy:{
                    reg_no:"asc"
                }
            })
        }
    },
    Mutation: {
        async create_attendance(parent, {data}, {prisma,auth,req}, info) {
            const Person_ID = auth(req)
            const {course_code,group_ref,session_ref,period,date, ...remData} = data
            
            remData.students.forEach(async(stud)=>{
                    await prisma.course_attendance.create({
                        data:{
                            course_list:{
                                connect: {
                                    course_code
                                }
                            },
                            student_list:{
                                connect: {
                                    reg_no: stud.reg_no
                                }
                            },
                            course_reference_table_course_attendance_group_refTocourse_reference_table:{
                                connect: {
                                    reference_id: group_ref
                                }
                            },
                            course_reference_table_course_attendance_session_refTocourse_reference_table:{
                                connect: {
                                    reference_id: session_ref
                                }
                            },
                            date,
                            period,
                            presence: stud.presence
                        }
                    })
                })
           
              
            return true;
        },

        async update_attendance(parent, {data}, {prisma,auth,req}, info) {
            const Person_ID = auth(req)
            const {course_code,group_ref,session_ref,period,date, ...remData} = data
            
            remData.students.forEach(async(stud)=>{
                console.log(stud)

                    let a = await prisma.course_attendance.updateMany({
                        where: {
                            course_code,
                            group_ref,
                            session_ref,
                            period,
                            date,
                            reg_no: stud.reg_no
                        },
                        data:{
                            presence: stud.presence
                        }
                    })
                    console.log(a)
                })
            return true;
        }
    }
}