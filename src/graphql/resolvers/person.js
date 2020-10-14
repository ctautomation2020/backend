import getPersonID from "../auth/getPersonID"

module.exports={
    Query:{

        async allPersons(parent, args, {prisma}, info) {
            return await prisma.person.findMany()
        },

        async person(parent, args, {prisma,req}, info){
            const Person_ID = getPersonID(req)
            return await prisma.person.findOne({
                where: {
                    Person_ID
                }
            })
        }

    },

    Mutation: {
        
        async createPerson(parent, {data}, {prisma}, info) {
            const {Prefix_Ref,Gender_Ref,Community_Ref,Marital_Status_Ref,...noref_data} = data
            const ref_data = noref_data
            if(Community_Ref){
                ref_data.person_reference_table_person_Community_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Community_Ref
                    }
                }
            }
            if(Gender_Ref){
                ref_data.person_reference_table_person_Gender_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Gender_Ref
                    }
                }
            }
            if(Marital_Status_Ref){
                ref_data.person_reference_table_person_Marital_Status_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Marital_Status_Ref
                    }
                }
            }
            if(Prefix_Ref){
                ref_data.person_reference_table_person_Prefix_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Prefix_Ref 
                    }
                }
            }
            return await prisma.person.create({data:{
                ...ref_data
            }
            })
        },

        async updatePerson(parent, {data}, {prisma}, info) {
            const{Person_ID,Prefix_Ref,Gender_Ref,Community_Ref,Marital_Status_Ref,...noref_data} = data

            const ref_data = noref_data
            if(Community_Ref){
                ref_data.person_reference_table_person_Community_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Community_Ref
                    }
                }
            }
            if(Gender_Ref){
                ref_data.person_reference_table_person_Gender_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Gender_Ref
                    }
                }
            }
            if(Marital_Status_Ref){
                ref_data.person_reference_table_person_Marital_Status_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Marital_Status_Ref
                    }
                }
            }
            if(Prefix_Ref){
                ref_data.person_reference_table_person_Prefix_RefToperson_reference_table={
                    connect:{
                        Reference_ID:Prefix_Ref 
                    }
                }
            }
            
            return await prisma.person.update({
                where:{
                    Person_ID:data.Person_ID
                },
                data:{
                    ...ref_data
                }
            })
        },

    },

    Person: {

        async Person_Qualification(parent, {data}, {prisma}, info) {
            return await prisma.person_qualification.findMany({
                where: {
                    Person_ID: parent.Person_ID
                }
            })
        }
    }
}

