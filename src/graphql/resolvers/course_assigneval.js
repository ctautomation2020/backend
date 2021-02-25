module.exports = {
    Query: {
        async assign_evaluation(parent, {data}, {prisma}, info) {
            return await prisma.course_assigneval.findMany({
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
        async createAssign_evaluation(parent, {data}, {prisma,auth,req}, info) {
            const Person_ID = auth(req,2)
            const {course_code,group_ref,session_ref,assign_num,reg_no, ...remData} = data
            let total = 0 

            remData.questions.forEach((ques)=>{
                total = total + ques.mark
            })

            remData.questions.forEach(async(ques)=>{
                await prisma.course_assigneval.create({
                    data:{
                        course_list:{
                            connect: {
                                course_code
                            }
                        },
                        student:{
                            connect: {
                                Register_No:reg_no
                            }
                        },
                        course_reference_table_course_assigneval_group_refTocourse_reference_table:{
                            connect: {
                                ref_code: group_ref
                            }
                        },
                        course_reference_table_course_assigneval_session_refTocourse_reference_table:{
                            connect: {
                                ref_code: session_ref
                            }
                        },
                        assign_num,
                        ...ques
                    }
                })
            })

            await prisma.course_evaluation.create({
                data:{
                    course_list:{
                        connect: {
                            course_code
                        }
                    },
                    student:{
                        connect: {
                            Register_No:reg_no
                        }
                    },
                    course_reference_table_course_evaluation_group_refTocourse_reference_table:{
                        connect: {
                            ref_code: group_ref
                        }
                    },
                    course_reference_table_course_evaluation_session_refTocourse_reference_table:{
                        connect: {
                            ref_code: session_ref
                        }
                    },
                    type:2,
                    total_mark: data.total_mark,
                    marks_obtained: total,
                    number: assign_num
                    

                }
            })

        },

        async updateAssign_evaluation(parent, {data}, {prisma,auth,req}, info) {
            const Person_ID = auth(req)
            const {course_code,group_ref,session_ref,assign_num,reg_no, ...remData} = data
            
            remData.questions.forEach(async(ques)=>{
                await prisma.course_assigneval.updateMany({
                    where:{
                        course_code,
                        group_ref,
                        session_ref,
                        assign_num,
                        reg_no,
                        question_num: ques.question_num
                    },
                    data:{
                        mark:ques.mark
                    }
                })
            })
        }
    }
}