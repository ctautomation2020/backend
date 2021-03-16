const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports= {
    Query:{

        async login(parent,{data},{prisma},info){
            const user = await prisma.credentials.findUnique({where:{
                Username:data.Username
            }})
            if(!user)
            throw new Error("username not found")
            const isMatch=await bcrypt.compare(data.Password,user.Password)
            if(!isMatch)
            throw "invalid password"
            
            const token = await jwt.sign({Person_ID:user.Person_ID},"ct_admin")
            //console.log(token)
            return ({
                token,
                Person_ID:user.Person_ID
            })
        }

    },

    Mutation:{
        
        async createUser(parent,{data},{prisma},info){
            data.Password = await bcrypt.hash(data.Password,8)
            const {Person_ID,...refData} = data
            return await prisma.credentials.create({
                data:{
                    person:{
                        connect:{
                            Person_ID:data.Person_ID
                        }
                    },
                    ...refData
                }
            })
        },

        async updateUser(parent, {data}, {prisma}, info){
            if(data.Password){
                data.Password = await bcrypt.hash(data.Password,8)
            }
            const {Person_ID,...refData} = data
            const cid = await prisma.credentials.findUnique({where:{
                Person_ID:data.Person_ID
            }})
            return await prisma.credentials.update({
                where:{
                    Credentials_ID: cid.Credentials_ID
                },
                data:{
                    person:{
                        connect:{
                            Person_ID:data.Person_ID
                        }
                    },
                    ...refData
                }
            })
        }

    }
}