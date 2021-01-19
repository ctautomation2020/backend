const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports= {
    Query:{

        async auth_login(parent,{data},{prisma},info){
            const user = await prisma.user_info.findUnique({where:{
                username: data.username
            }})
            console.log(user)

            if(!user)
            throw new Error("username not found")
            const isMatch=await bcrypt.compare(data.password,user.password)
            if(!isMatch)
            throw "invalid password"
            
            const token = jwt.sign({Person_ID:user.Person_ID,user_role: user.user_role },"ct_admin")
            //console.log(token)
            return ({
                token,
                Person_ID:user.Person_ID,
                user_role: user.user_role
            })
        }

    },

    Mutation:{
        
        async auth_createUser(parent,{data},{prisma},info){
            data.password = await bcrypt.hash(data.password,8)
            const {Person_ID,...refData} = data
            return await prisma.user_info.create({
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

        async auth_updateUser(parent, {data}, {prisma}, info){
            if(data.password){
                data.password = await bcrypt.hash(data.password,8)
            }
            const {Person_ID,...refData} = data
            const cid = await prisma.user_info.findOne({where:{
                Person_ID:data.Person_ID
            }})
            return await prisma.user_info.update({
                where:{
                    user_ID: cid.user_ID
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