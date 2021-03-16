let fs = require('fs')
let path = require('path')
module.exports = {
    Query: {
        async award(parent, {data}, {prisma}, info) {
            return await prisma.person_awards.findUnique({
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
            const Person_ID = auth(req,2)
      
            const {File, ...no_refdata} = data
            const award =  await prisma.person_awards.create({
                data:{
                    person:{
                        connect:{
                            Person_ID:Person_ID
                        }
                    },
                    ...no_refdata
                }
            })

            const { createReadStream, filename } = await data.File;

            if (!fs.existsSync(path.join(__dirname, "../../public", Person_ID.toString()))){
                fs.mkdirSync(path.join(__dirname, "../../public", Person_ID.toString()));
            }

            const ext = path.extname(filename)

            const name = "Award" + award.Award_ID + ext

            await new Promise(res =>
                createReadStream()
                .pipe(fs.createWriteStream(path.join(__dirname, "../../public/", Person_ID.toString(), name)))
                .on("close", res)
            );

            return award;
        },

        async updatePersonAward(parent, {data}, {prisma,auth,req}, info) {
            const Person_ID = auth(req,2)
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
            const Person_ID = auth(req,2)
            
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