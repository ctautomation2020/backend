const jwt=require('jsonwebtoken')

const getPersonID=(req,role)=>{
    const header = req.headers.authorization

    if(!header){
        throw new Error("invalid auth")
    }

    const token = header.replace('Bearer ','')

    try{
        const decoded = jwt.verify(token,"ct_admin")
        if(role && decoded.user_role < role){
            throw new Error("unauthorized privilege")
        }
    
        return decoded.username
    }
    
    catch(e){
        throw new Error("invalid access token")
    }
    
    
}

export default getPersonID