import  jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import User from "../models/User.models.js";
import Role from "../models/Role.models.js";

export const authRequired = (req, res, next) => {

    const {token} = req.cookies;
    
    if (!token) {
        return res.status(401).json({message: 'No token provided'});
    }
    jwt.verify(token,TOKEN_SECRET,(err, decoded) => {
        if (err) {
            return res.status(403).json({message: 'Invalid token provided'});    
        }
        req.user = decoded; 
        next();
    })
}
export const isAdmin = async(req, res, next) =>{
    const userFound = await User.findById(req.user.id)
    const roles = await Role.find({_id: {$in: userFound.roles}})
    if (roles.length === 0) {
        return res.status(403).json({message: 'You are not admin'})
    }
    for(let i=0; i<roles.length;i++){
        if(roles[i].name === "admin"){
            next();
            return;
        }
    }
}