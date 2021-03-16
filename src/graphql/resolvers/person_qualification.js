module.exports = {
    Query: {
        async qualification(parent, args, {prisma}, info) {
            return await prisma.person_qualification.findUnique({
                where:{
                    Qualification_ID: args.data.Qualification_ID
                }
            })
        },

        async personQualifications(parent, args, {prisma}, info) {
            return await prisma.person_qualification.findMany({
                where:{
                    Person_ID: args.data.Person_ID
                }
            })
        }
    },

    Mutation: {
        async createPersonQualification(parent, {data}, {prisma}, info) {
            const Person_ID = auth(req,2)
            const {Qualification_Level_Ref,Degree_Ref,Branch_Ref,Class_Obtained_Ref, ...noref_data} = data
            const ref_data = noref_data
            if(Branch_Ref){
                ref_data.person_reference_table_person_qualification_Branch_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Branch_Ref
                    }
                }
            }
            if(Class_Obtained_Ref){
                ref_data.person_reference_table_person_qualification_Class_Obtained_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Class_Obtained_Ref
                    }
                }
            }
            if(Degree_Ref){
                ref_data.person_reference_table_person_qualification_Degree_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Degree_Ref
                    }
                }
            }
            if(Qualification_Level_Ref){
                ref_data.person_reference_table_person_qualification_Qualification_Level_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Qualification_Level_Ref
                    }
                }
            }
            return await prisma.person_qualification.create({
                data:{
                    person:{
                        connect:{
                            Person_ID:data.Person_ID
                        }
                    },
                    ...ref_data
                }
            })
        },

        async updatePersonQualification(parent, {data}, {prisma}, info) {
            const Person_ID = auth(req,2)
            const {Qualification_ID,Qualification_Level_Ref,Degree_Ref,Branch_Ref,Class_Obtained_Ref, ...noref_data} = data
            const ref_data = noref_data
            if(Branch_Ref){
                ref_data.person_reference_table_person_qualification_Branch_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Branch_Ref
                    }
                }
            }
            if(Class_Obtained_Ref){
                ref_data.person_reference_table_person_qualification_Class_Obtained_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Class_Obtained_Ref
                    }
                }
            }
            if(Degree_Ref){
                ref_data.person_reference_table_person_qualification_Degree_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Degree_Ref
                    }
                }
            }
            if(Qualification_Level_Ref){
                ref_data.person_reference_table_person_qualification_Qualification_Level_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Qualification_Level_Ref
                    }
                }
            }
            return await prisma.person_qualification.update({
                where:{
                    Qualification_ID:data.Qualification_ID
                },
                data:{
                    ...ref_data
                }
            })
        },

        async deletePersonQualification(parent, {data}, {prisma}, info){
            const Person_ID = auth(req,2)

            return await prisma.person_qualification.delete({
                where:{
                    Qualification_ID:data.Qualification_ID
                }
            })
            
        }
        
    }
}