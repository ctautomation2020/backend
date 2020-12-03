let fs = require('fs')
let path = require('path')
module.exports = {
    Query: {
        async award(parent, {data}, {prisma}, info) {
            return await prisma.person_awards.findOne({
                where:{
                    Award_ID: data.Award_ID
                }
            })
        },
        
        async personAwards(parent, {data}, {prisma}, info) {
            return await prisma.person_awards.findMany({
                where:{
                    Person_ID: data.Person_ID
                }
            })
        }
    },

    Mutation: {
        async createPersonAward(parent, {data}, {prisma,auth,req}, info) {
            const Person_ID = auth(req)
            const { createReadStream, filename } = await data.File;
      
            await new Promise(res =>
                createReadStream()
                .pipe(fs.createWriteStream(path.join(__dirname, "../awards", filename)))
                .on("close", res)
            );
      
            //files.push(filename);
            console.log(createReadStream)
            const {File, ...no_refdata} = data
            return await prisma.person_awards.create({
                data:{
                    person:{
                        connect:{
                            Person_ID:Person_ID
                        }
                    },
                    ...no_refdata
                }
            })
            
        },

        async updatePersonAward(parent, {data}, {prisma,auth,req}, info) {
            const Person_ID = auth(req)
            const {Award_ID, ...ref_data} = data 
            return await prisma.person_awards.update({
                where:{
                    Award_ID
                },
                data:{
                    ...ref_data
                }
            })
        },

        async deletePersonAward(parent, {data}, {prisma,auth,req}, info) {
            const Person_ID = auth(req)
            
            return await prisma.person_awards.delete({
                where:{
                    Award_ID: data.Award_ID
                }
            })
        },
        uploadPersonAward: async (_, { file }) => {
            const { createReadStream, filename } = await file;
      
            await new Promise(res =>
                createReadStream()
                .pipe(fs.createWriteStream(path.join(__dirname, "../awards", filename)))
                .on("close", res)
            );
      
            //files.push(filename);
            console.log(createReadStream)


            return true;
          }
    }

}