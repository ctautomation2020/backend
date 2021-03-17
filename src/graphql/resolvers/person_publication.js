module.exports={
    Query:{
        async publication(parent, args, {prisma}, info) {
            return await prisma.person_publication.findUnique({
                where:{
                    Publication_ID: args.data.Publication_ID
                }
            })
        },
        async person_publications(parent, args, {prisma}, info) {
            return await prisma.person_publication.findMany({
                where:{
                    Person_ID: args.data.Person_ID
                }
            })
        },

    },

    Mutation:{
        async createPersonPublication(parent, {data}, {prisma,auth,req}, info) {
            const Person_ID = auth(req,2)

            const {Publication_Type_Ref,Level_Ref, ...noref_data} = data
            const ref_data = noref_data
            if(Publication_Type_Ref){
                ref_data.person_reference_table_person_publication_Publication_Type_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Publication_Type_Ref
                    }
                }
            }
            if(Level_Ref){
                ref_data.person_reference_table_person_publication_Level_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Level_Ref
                    }
                }
            }
            
            return await prisma.person_publication.create({
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
        async updatePersonPublication(parent, {data}, {prisma,auth,req}, info) {
            const Person_ID = auth(req,2)
            const {Publication_ID,Publication_Type_Ref,Level_Ref, ...noref_data} = data
            const ref_data = noref_data
            if(Publication_Type_Ref){
                ref_data.person_reference_table_person_publication_Publication_Type_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Publication_Type_Ref
                    }
                }
            }
            if(Level_Ref){
                ref_data.person_reference_table_person_publication_Level_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Level_Ref
                    }
                }
            }
            
            return await prisma.person_publication.update({
                where:{
                    Publication_ID:data.Publication_ID
                },
                data:{
                    ...ref_data
                }
            })
        },

        async deletePersonPublication(parent, {data}, {prisma,auth,req}, info) {
            const Person_ID = auth(req,2) 
            return await prisma.person_publication.delete({
                where:{
                    Publication_ID:data.Publication_ID
                }
            })
        }
    }
}
