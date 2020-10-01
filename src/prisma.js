const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const fun = async()=> {
    console.log(await prisma.person_qualification.create({
        data:{
            person:{
                connect:{
                    Person_ID:1
                }
            }
        }
    }))
}

fun()