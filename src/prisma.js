const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const fun = async()=> {
    console.log(await prisma.person_qualification.create({
        data:{
            person:{
                connect:{
                    Person_ID:1
                }
            },
            person_reference_table_person_qualification_Branch_RefToperson_reference_table:{
                connect:{
                    Reference_ID:null
                }
            }
        }
    }))
}

fun()