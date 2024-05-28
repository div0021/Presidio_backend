import jwt from "jsonwebtoken"
export function verifyJwt(token){
    try{
        const decoded =  jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        return {
            decoded
        };
    }catch(error){
        return {
            decoded:null
        }
    }
}