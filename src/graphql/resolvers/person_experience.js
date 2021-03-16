module.exports = {
    Query:{
        async experience(parent, args, {prisma}, info) {
            return await prisma.person_experience.findUnique({
                where:{
                    Experience_ID : args.data.Experience_ID
                }
            })
        },

        async person_experiences(parent, args, {prisma}, info) {
            return await prisma.person_experience.findMany({
                where:{
                    Person_ID : args.data.Person_ID
                }
            })
        },
    },

    Mutation: {
        async createPersonExperience(parent, {data}, {prisma,auth,req}, info) {
            const {Experience_ID,Designation_Ref,Emp_Category_Ref,Work_Nature_Ref, ...noref_data} = data
            const ref_data = noref_data
            const Person_ID = auth(req,2)
            

            if(Designation_Ref){
                ref_data.person_reference_table_person_experience_Designation_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Designation_Ref
                    }
                }
            }
            if(Emp_Category_Ref){
                ref_data.person_reference_table_person_experience_Emp_Category_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Emp_Category_Ref
                    }
                }
            }
            if(Work_Nature_Ref){
                ref_data.person_reference_table_person_experience_Work_Nature_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Work_Nature_Ref
                    }
                }
            }

            return await prisma.person_experience.create({
                data:{
                    person:{
                        connect:{
                            Person_ID:Person_ID
                        }
                    },
                    ...ref_data
                }
            })
        },

        async updatePersonExperience(parent, {data}, {prisma,auth,req}, info) {
            const {Experience_ID,Designation_Ref,Emp_Category_Ref,Work_Nature_Ref, ...noref_data} = data
            const ref_data = noref_data
            
            const Person_ID = auth(req,2)

            if(Designation_Ref){
                ref_data.person_reference_table_person_experience_Designation_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Designation_Ref
                    }
                }
            }
            if(Emp_Category_Ref){
                ref_data.person_reference_table_person_experience_Emp_Category_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Emp_Category_Ref
                    }
                }
            }
            if(Work_Nature_Ref){
                ref_data.person_reference_table_person_experience_Work_Nature_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Work_Nature_Ref
                    }
                }
            }
            return await prisma.person_experience.update({
                where:{
                    Experience_ID
                },
                data:{
                    ...ref_data
                }
            })
        },

        async deletePersonExperience(parent, {data}, {prisma,auth,req}, info) {
            const Person_ID = auth(req)
            return await prisma.person_experience.delete({
                where:{
                    Experience_ID: data.Experience_ID
                }
            })
        }
    }
}