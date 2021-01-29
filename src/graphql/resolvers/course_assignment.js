module.exports = {
    Query: {
        async assignment(parent, {data}, {prisma}, info){
            // return await prisma.course_assignment.findMany({
            //     where:{
            //         ...data
            //     },
            //     orderBy:{
            //         question_num:'asc'
            //     }
            // })
            const result = await prisma.$queryRaw`SELECT * FROM course_assignment
            WHERE course_code=${data.course_code} AND session_ref=${data.session_ref} AND group_ref=${data.group_ref} AND assign_num=${data.assign_num}
            ORDER BY LENGTH(question_num), question_num`

            return result
        },
        async session_assignments(parent, {data}, {prisma}, info){
            const a =  await prisma.course_assignment.findMany({
                where:{
                    ...data
                },
                select: {
                    assign_num: true
                },
                distinct: ["assign_num"]
            })
            const assign= []
            a.forEach((a)=>{
                assign.push(a.assign_num)
                
            })

            return assign
        }
    },

    Mutation: {
        async createAssignment(parent, {data}, {prisma,auth,req}, info){
            
            const Person_ID = auth(req,2)
            const {course_code,group_ref,session_ref,assign_num,entry_date,deadline, ...remData} = data
            
            remData.questions.forEach(async(ques)=>{
                await prisma.course_assignment.create({
                    data:{
                        course_list:{
                            connect: {
                                course_code
                            }
                        },
                        course_reference_table_course_assignment_group_refTocourse_reference_table:{
                            connect: {
                                ref_code: group_ref
                            }
                        },
                        course_reference_table_course_assignment_session_refTocourse_reference_table:{
                            connect: {
                                ref_code: session_ref
                            }
                        },
                        assign_num,
                        entry_date,
                        deadline,
                        ...ques

                    }
                })
            })
        }
    }
            
}