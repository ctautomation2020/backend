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
            let myMap = new Map();
            const { course_code, group_ref, session_ref, ...remData } = data
            let flag = 1

            const temp = await prisma.course_cacomp.findMany({
                where: {
                    course_code,
                    group_ref,
                    session_ref
                }
            })



            if(temp.length){
                throw new Error("ca_comp already created")
            }

            var midterm_number = 1

            for (var i = 0; i < remData.compques.length; i++) {

                let ques = remData.compques[i]

                let tynum = ques.type.toString() + ques.number.toString()

                myMap.set(tynum, ques.weightage)


                await prisma.course_cacomp.create({
                    data: {
                        course_list: {
                            connect: {
                                course_code
                            }
                        },
                        person_reference_table_course_cacomp_group_refToperson_reference_table: {
                            connect: {
                                Reference_ID: group_ref
                            }
                        },
                        person_reference_table_course_cacomp_session_refToperson_reference_table: {
                            connect: {
                                Reference_ID: session_ref
                            }
                        },
                        ...ques
                    }
                })



            }


            const stud_marks = await prisma.course_evaluation.findMany({

                where: {
                    course_code,
                    group_ref,
                    session_ref
                },
                distinct: ["reg_no"]
            })

            for (var i = 0; i < stud_marks.length; i++) {
                let stud = stud_marks[i];
                let temp = await prisma.course_evaluation.findMany({
                    where: {
                        course_code,
                        group_ref,
                        session_ref,
                        reg_no: stud.reg_no,
                    }
                })

                for (var j = 0; j < temp.length; j++) {
                    let marks = temp[j]

                    const map_idx = myMap.get(marks.type.toString() + marks.number.toString())

                    if (map_idx) {

                        let weighted_mark = marks.marks_obtained / marks.total_mark * myMap.get(marks.type.toString() + marks.number.toString())
                        

                        await prisma.course_evaluation.updateMany({
                            where: {
                                course_code,
                                group_ref,
                                session_ref,
                                reg_no: marks.reg_no,
                                type: marks.type,
                                number: marks.number,

                            },

                            data: {
                                weighted_mark: weighted_mark
                            }

                        })
                    }

                    else if (marks.type == 153 && myMap.get("168" + marks.number.toString())) {

                        await prisma.$queryRaw`UPDATE course_evaluation
                        SET type=168,weighted_mark=${marks.marks_obtained / marks.total_mark * 100}
                        WHERE course_code=${course_code} AND session_ref=${session_ref} AND group_ref=${group_ref} AND 
                        reg_no=${stud.reg_no} AND type IN(153,168) AND number=${marks.number}`
                        
                        // await prisma.course_evaluation.updateMany({
                        //     where: {
                        //         course_code,
                        //         group_ref,
                        //         session_ref,
                        //         reg_no: stud.reg_no,
                        //         type: { in: [153, 168] },
                        //         number: marks.number,

                        //     },

                        //     data: {
                        //         ...ref_data
                        //     }

                        // })
                    }

                }



                const ca = await prisma.course_evaluation.aggregate({
                    sum: {
                        weighted_mark: true
                    },
                    where: {
                        course_code,
                        group_ref,
                        session_ref,
                        reg_no: stud.reg_no,
                        type: { not: 168 }
                    }
                })

                const midterm = await prisma.course_evaluation.aggregate({
                    sum: {
                        weighted_mark: true
                    },
                    where: {
                        course_code,
                        group_ref,
                        session_ref,
                        reg_no: stud.reg_no,
                        type: 168
                    }
                })

                

                const total_marks = ca.sum.weighted_mark / 100 * 60 + midterm.sum.weighted_mark / 100 * 40

                await prisma.course_internalcalc.create({

                    data: {
                        course_list: {
                            connect: {
                                course_code
                            }
                        },
                        person_reference_table_course_internalcalc_group_refToperson_reference_table: {
                            connect: {
                                Reference_ID: group_ref
                            }
                        },
                        person_reference_table_course_internalcalc_session_refToperson_reference_table: {
                            connect: {
                                Reference_ID: session_ref
                            }
                        },
                        student: {
                            connect: {
                                Register_No: stud.reg_no
                            }
                        },
                        ca: ca.sum.weighted_mark,
                        midterm: midterm.sum.weighted_mark,
                        total_marks: total_marks
                    }

                })



            }



            return flag;

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