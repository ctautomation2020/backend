module.exports={
    Query:{
        async course_lessonplan(parent, {data}, {prisma}, info){
            return await prisma.course_lessonplan.findMany({
                where:{
                    ...data
                }
            })
        }
    },

    Mutation: {
        async create_course_lessonplan(parent, {data}, {prisma,auth,req}, info){

            const Person_ID = auth(req,2)
            const {course_code,group_ref,session_ref,course_ctopic_id, ...remData} = data
            return await prisma.course_lessonplan.create({
                data:{
                    course_topic:{
                        connect:{
                            ctopic_id:course_ctopic_id
                        }
                    },
                    course_list:{
                        connect: {
                            course_code
                        }
                    },
                    course_reference_table_course_lessonplan_group_refTocourse_reference_table:{
                        connect: {
                            ref_code: group_ref
                        }
                    },
                    course_reference_table_course_lessonplan_session_refTocourse_reference_table:{
                        connect: {
                            ref_code: session_ref
                        }
                    },
                    ...remData
                }
            })

        },

        async update_course_lessonplan(parent, {data}, {prisma,auth,req}, info){

            const Person_ID = auth(req,2)
            const {clp_id, ...remData} = data

            return await prisma.course_lessonplan.update({
                where:{
                    clp_id:data.clp_id
                },
                data:{
                    ...remData
                }
            })
        },

        async delete_course_lessonplan(parent, {data}, {prisma,auth,req}, info){

            const Person_ID = auth(req,2)

            return await prisma.course_lessonplan.delete({
                where:{
                    clp_id:data.clp_id
                },
                
            })
        }
        
    },
    course_lessonplan:{
        async course_topic(parent, {data}, {prisma}, info) {
            return await prisma.course_topic.findUnique({
                where: {
                    ctopic_id: parent.course_ctopic_id
                }
            })
            
        }
    }
}