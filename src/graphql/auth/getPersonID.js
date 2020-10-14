const jwt=require('jsonwebtoken')

const getPersonID=(req)=>{
    const header = req.headers.authorization

    if(!header){
        throw new Error("invalid auth")
    }

    const token = header.replace('Bearer ','')
    const decoded = jwt.verify(token,"ct_admin")

    return decoded.Person_ID
}

export default getPersonID