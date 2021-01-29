module.exports = {

    Query: {
        async course_cacomp(parent, { data }, { prisma }, info) {
            return await prisma.course_cacomp.findMany({
                where: {
                    ...data
                }
            })
        }
    },

    Mutation: {
        async create_course_cacomp(parent, { data }, { prisma, auth, req }, info) {
            const Person_ID = auth(req, 2)
            console.log(Person_ID)
            const { course_code, group_ref, session_ref, ...remData } = data
            let flag = 1
            remData.compques.forEach(async (ques) => {
                console.log(ques)
                
                    await prisma.course_cacomp.create({
                        data: {
                            course_list: {
                                connect: {
                                    course_code
                                }
                            },
                            course_reference_table_course_cacomp_group_refTocourse_reference_table: {
                                connect: {
                                    ref_code: group_ref
                                }
                            },
                            course_reference_table_course_cacomp_session_refTocourse_reference_table: {
                                connect: {
                                    ref_code: session_ref
                                }
                            },
                            ...ques
                        }
                    })
            
            })


            return flag;

        },

        async update_course_cacomp(parent, { data }, { prisma, auth, req }, info) {
            const Person_ID = auth(req, 2)
            const { course_code, group_ref, session_ref, ...remData } = data

            remData.compques.forEach(async (ques) => {
                await prisma.course_cacomp.updateMany({
                    where: {
                        course_code,
                        group_ref,
                        session_ref,
                        type: ques.type,
                        number: ques.number

                    },
                    data: {
                        weightage: ques.weightage
                    }
                })
            })

            return true;
        },

        async delete_course_cacomp(parent, { data }, { prisma, auth, req }, info) {
            const Person_ID = auth(req, 2)


            await prisma.course_cacomp.deleteMany({
                where: {
                    ...data
                }
            })

            return true;

        }

    }
}