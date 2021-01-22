module.exports={

    Query:{
        async course_artimat(parent, {data}, {prisma}, info){
            return await prisma.course_artimat.findMany({
                where:{
                    ...data
                }
            })
        }
    }
}