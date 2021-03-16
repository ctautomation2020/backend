module.exports={
    Query:{
        async attendance(parent, {data}, {prisma}, info) {
           

            return await prisma.course_attendance.findMany({
                where:{
                    ...data
                }
            })
        }
    },
    Mutation: {
        async create_attendance(parent, {data}, {prisma,auth,req}, info) {
            const Person_ID = auth(req,2)
            const {course_code,group_ref,session_ref,period,date, ...remData} = data
            
            remData.students.forEach(async(stud)=>{
                    await prisma.course_attendance.create({
                        data:{
                            course_list:{
                                connect: {
                                    course_code
                                }
                            },
                            student:{
                                connect: {
                                    Register_No: stud.reg_no
                                }
                            },
                            person_reference_table_course_attendance_group_refToperson_reference_table:{
                                connect: {
                                    Reference_ID: group_ref
                                }
                            },
                            person_reference_table_course_attendance_session_refToperson_reference_table:{
                                connect: {
                                    Reference_ID: session_ref
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
            const Person_ID = auth(req,2)
            const {course_code,group_ref,session_ref,period,date, ...remData} = data
            
            remData.students.forEach(async(stud)=>{
                

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
                    
                })
            return true;
        }
    },
    course_attendance: {
        async student(parent, {data}, {prisma}, info) {
            return await prisma.student.findUnique({

                where:{
                    Register_No: parent.reg_no
                }
            })
            
        }
    }
}