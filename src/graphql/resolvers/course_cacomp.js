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

            
        
            // if(temp.length){
            //     throw new Error("ca_comp already created")
            // }

            var midterm_number =1

            remData.compques.forEach(async (ques) => {
                    let tynum = ques.type.toString()+ques.number.toString()
                    
                    myMap.set(tynum,ques.weightage)
                    
                    
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

            const stud_marks = await prisma.course_evaluation.findMany({
    
                where:{
                    course_code, 
                    group_ref,
                    session_ref
                },
                distinct:["reg_no"]
            })

            stud_marks.forEach(async(stud)=>{
                let temp = await prisma.course_evaluation.findMany({
                    where:{
                        course_code, 
                        group_ref,
                        session_ref,
                        reg_no: stud.reg_no,
                    }
                })

                
                
                temp.forEach(async(marks)=>{
                    
                    const map_idx = myMap.get(marks.type.toString()+marks.number.toString())

                    if(map_idx ){

                        let weighted_mark = marks.marks_obtained / marks.total_mark * myMap.get(marks.type.toString()+marks.number.toString())
                        
                        await prisma.course_evaluation.updateMany({
                            where:{
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

                    else if(marks.type==1 && myMap.get("3"+marks.number.toString())) {
                        //console.log("hr",stud.reg_no)
                        await prisma.course_evaluation.updateMany({
                            where:{
                                course_code, 
                                group_ref,
                                session_ref,
                                reg_no: stud.reg_no,
                                type: {in:[1,3]},
                                number: marks.number,
    
                            },
    
                            data: {
                                type: 3,
                                weighted_mark: marks.marks_obtained / marks.total_mark * 100
                            }
    
                        })
                    }

                })

                

                const ca = await prisma.course_evaluation.aggregate({
                    sum:{
                        weighted_mark:true
                    },
                    where:{
                        course_code, 
                        group_ref,
                        session_ref,
                        reg_no: stud.reg_no,
                        type:{not:3}
                    }
                })
                
                const midterm = await prisma.course_evaluation.aggregate({
                    sum:{
                        weighted_mark:true
                    },
                    where:{
                        course_code, 
                        group_ref,
                        session_ref,
                        reg_no: stud.reg_no,
                        type:3
                    }
                })

                //const midterm = 100

                const total_marks = ca.sum.weighted_mark/100*60 + midterm.sum.weighted_mark/100 *40

                await prisma.course_internalcalc.create({

                    data:{
                        course_list:{
                            connect: {
                                course_code
                            }
                        },
                        course_reference_table_course_internalcalc_group_refTocourse_reference_table:{
                            connect: {
                                ref_code: group_ref
                            }
                        },
                        course_reference_table_course_internalcalc_session_refTocourse_reference_table:{
                            connect: {
                                ref_code: session_ref
                            }
                        },
                        student:{
                            connect: {
                                Register_No:stud.reg_no
                            }
                        },
                        ca:ca.sum.weighted_mark,
                        midterm:midterm.sum.weighted_mark,
                        total_marks:total_marks
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