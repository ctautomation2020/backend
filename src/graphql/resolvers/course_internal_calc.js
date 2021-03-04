module.exports = {
    Query:{
        async internal_calc(parent, {data}, {prisma}, info) {
            return await prisma.course_internalcalc.findMany({
                where:{
                    ...data
                }
            })
        }
    }
}