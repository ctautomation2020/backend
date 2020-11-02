const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const fun = async()=> {
    console.log(await prisma.person.update({
        where:{

                    Person_ID:1
                },
            data:{
                person_reference_table_person_Community_RefToperson_reference_table:{
                    connect:{
                        Reference_ID:4
                    }
                }
            }
            
        
    }))
}

fun()