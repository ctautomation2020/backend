const jwt=require('jsonwebtoken')

const getPersonID=(req,role)=>{
    const header = req.headers.authorization

    if(!header){
        throw new Error("invalid auth")
    }

    const token = header.replace('Bearer ','')
    const decoded = jwt.verify(token,"ct_admin")
    
    if(role && decoded.user_role < role){
        throw new Error("unauthorized privilege")
    }


    return decoded.username
}

export default getPersonID