import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export function createdAccessToken (payload){
   return new Promise((resolve, reject) => {
    jwt.sign(payload,
        TOKEN_SECRET,
        {
            expiresIn: "1d"
        }, (err, token) => {
        if(err) reject(err);
        resolve(token);
        
    });
   })
}

export function createdAccessTokenPass (payload){
    return new Promise((resolve, reject) => {
     jwt.sign(payload,
         TOKEN_SECRET,
         {
             expiresIn: "1h"
         }, (err, token) => {
         if(err) reject(err);
         resolve(token);
         
     });
    })
 }