module.exports = {
    Query: {
        async assesment(parent, {data}, {prisma}, info){
            return await prisma.course_assessment.findMany({
                where:{
                    ...data
                }
            })
            
        }
    },

    Mutation: {
        async createAssesment(parent, {data}, {prisma}, info){
            //console.log(JSON.stringify(data.section[0].questions[0],null,2))
            const {course_code,group_ref,session_ref,assess_num,entry_date, ...remData} = data
            remData.section.forEach(async(sec)=>{
                sec.questions.forEach(async(ques)=>{
                    await prisma.course_assessment.create({
                        data:{
                            course_list:{
                                connect: {
                                    course_code
                                }
                            },
                            course_reference_table_course_assessment_group_refTocourse_reference_table:{
                                connect: {
                                    reference_id: group_ref
                                }
                            },
                            course_reference_table_course_assessment_session_refTocourse_reference_table:{
                                connect: {
                                    reference_id: session_ref
                                }
                            },
                            assess_num,
                            entry_date,
                            section: sec.name,
                            ...ques

                        }
                    })
                })
            })

        }
    }
}