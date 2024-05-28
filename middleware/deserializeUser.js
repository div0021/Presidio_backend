import jwt from "jsonwebtoken"
import lodash from "lodash";
import { verifyJwt } from "../utils/verifyJwt.js";


export const deserializeUser = (req,res,next) => {
    
  const token =
  lodash.get(req, "cookies.jwt");


if(!token) return next();

  const {decoded} = verifyJwt(token);

  if(decoded){
    res.locals.userId = decoded.userId;
  }
  next();
}