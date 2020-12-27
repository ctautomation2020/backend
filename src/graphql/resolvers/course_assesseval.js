module.exports = {
    Query: {
        async assess_evaluation(parent, {data}, {prisma}, info) {
            return await prisma.course_assesseval.findMany({
                where:{
                    ...data
                },
                orderBy:{
                    question_num:'asc'
                }
            })
        }
    },

    Mutation: {
        async createAssess_evaluation(parent, {data}, {prisma,auth,req}, info) {
            const Person_ID = auth(req)
            const {course_code,group_ref,session_ref,assess_num,reg_no, ...remData} = data
            
            remData.questions.forEach(async(ques)=>{
                await prisma.course_assesseval.create({
                    data:{
                        course_list:{
                            connect: {
                                course_code
                            }
                        },
                        student_list:{
                            connect: {
                                reg_no
                            }
                        },
                        course_reference_table_course_assesseval_group_refTocourse_reference_table:{
                            connect: {
                                reference_id: group_ref
                            }
                        },
                        course_reference_table_course_assesseval_session_refTocourse_reference_table:{
                            connect: {
                                reference_id: session_ref
                            }
                        },
                        assess_num,
                        ...ques
                    }
                })
            })

        },

        async updateAssess_evaluation(parent, {data}, {prisma,auth,req}, info) {
            const Person_ID = auth(req)
            const {course_code,group_ref,session_ref,assess_num,reg_no, ...remData} = data
            
            remData.questions.forEach(async(ques)=>{
                await prisma.course_assesseval.updateMany({
                    where:{
                        course_code,
                        group_ref,
                        session_ref,
                        assess_num,
                        reg_no
                    },
                    data:{
                        ...ques
                    }
                })
            })
        }
    }
}