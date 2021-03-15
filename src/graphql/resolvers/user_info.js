const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var randtoken = require('rand-token');

module.exports = {
    Query: {

        async auth_login(parent, { data }, { prisma }, info) {
            const user = await prisma.user_info.findUnique({
                where: {
                    username: data.username
                }
            })


            if (!user)
                throw new Error("username not found")
            const isMatch = await bcrypt.compare(data.password, user.password)
            if (!isMatch)
                throw "invalid password"

            const token = jwt.sign({ "username": user.username, "user_role": user.user_role }, "ct_admin", { expiresIn: 600 })
            const refresh_token = randtoken.uid(128)

            await prisma.user_info.update({
                where: {
                    username: user.username
                },
                data: {
                    refresh_token,
                }
            })
            //console.log(token)
            return ({
                token,
                refresh_token,
                Person_ID: user.username,
                user_role: user.user_role
            })
        },


    },

    Mutation: {

        async auth_createUser(parent, { data }, { prisma }, info) {
            data.password = await bcrypt.hash(data.password, 8)

            return await prisma.user_info.create({
                data: {
                    ...data
                }
            })
        },

        async auth_refreshToken(parent, { data }, { prisma }, info) {

            const user = await prisma.user_info.findUnique({
                where: {
                    username: data.username
                }
            })


            if (user.refresh_token == data.refresh_token) {

                const token = jwt.sign({ "username": user.username, "user_role": user.user_role }, "ct_admin", { expiresIn: 600 })
                const refresh_token = randtoken.uid(128)

                await prisma.user_info.update({
                    where: {
                        username: user.username
                    },
                    data: {
                        refresh_token,
                    }
                })

                return ({
                    token,
                    refresh_token,
                    Person_ID: user.username,
                    user_role: user.user_role
                })
            }

            else {
                throw new Error("invalid refresh token")
            }

        },

        async auth_updateUser(parent, { data }, { prisma }, info) {
            if (data.password) {
                data.password = await bcrypt.hash(data.password, 8)
            }

            const cid = await prisma.user_info.findOne({
                where: {
                    username: data.username
                }
            })
            return await prisma.user_info.update({
                where: {
                    user_ID: cid.user_ID
                },
                data: {
                    ...data
                }
            })
        },

        async auth_logout(parent, { data }, { prisma, auth, req }, info) {
            const username = auth(req,1)
            if (username) {
                await prisma.user_info.update({
                    where: {
                        username
                    },
                    data: {
                        refresh_token: null
                    }
                })

                return "successfully logged out"
            }

            else{
                throw new Error("invalid auth")
            }
        }



    }
}