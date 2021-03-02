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
        
        async createPerson(parent, {data}, {prisma,req,auth}, info) {

            const Person_ID = auth(req,1)
            


            const {Prefix_Ref,Gender_Ref,Community_Ref,Marital_Status_Ref,Designation,...noref_data} = data
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
            if(Designation){
                ref_data.person_reference_table_person_DesignationToperson_reference_table={
                    connect:{
                        Reference_ID:Designation
                    }
                }
            }
            return await prisma.person.create({data:{
                user_info:{
                    connect:{
                        username:Person_ID

                    }
                },
                
            }
            })
        },

        async updatePerson(parent, {data}, {prisma,auth,req}, info) {



            const{Person_ID,Prefix_Ref,Gender_Ref,Community_Ref,Marital_Status_Ref,Designation,...noref_data} = data
            
            const Auth_Person_ID = auth(req)

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
            if(Designation){
                ref_data.person_reference_table_person_DesignationToperson_reference_table={
                    connect:{
                        Reference_ID:Designation
                    }
                }
            }
            
            return await prisma.person.update({
                where:{
                    Person_ID:Auth_Person_ID
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

