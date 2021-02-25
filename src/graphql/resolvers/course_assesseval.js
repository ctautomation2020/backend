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
            const Person_ID = auth(req,2)
            const {course_code,group_ref,session_ref,assess_num,reg_no, ...remData} = data

            let total = 0 

            remData.questions.forEach(async(ques)=>{
                total = total + ques.mark
            })
            
            remData.questions.forEach(async(ques)=>{
                await prisma.course_assesseval.create({
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
                        course_reference_table_course_assesseval_group_refTocourse_reference_table:{
                            connect: {
                                ref_code: group_ref
                            }
                        },
                        course_reference_table_course_assesseval_session_refTocourse_reference_table:{
                            connect: {
                                ref_code: session_ref
                            }
                        },
                        assess_num,
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
                    type:1,
                    total_mark: data.total_mark,
                    marks_obtained: total,
                    number: assess_num
                    

                }
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