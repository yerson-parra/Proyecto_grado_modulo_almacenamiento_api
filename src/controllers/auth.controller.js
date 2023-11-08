import User from "../models/User.models";
import bcrypt from 'bcryptjs'
import { createdAccessToken, createdAccessTokenPass } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import Role from "../models/Role.models";





const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'yerson2812@gmail.com', 
      pass: 'ywzk hcxt yurj svzq', 
    },
  });


export const register = async(req, res) => {
    const {email, password, username, roles} = req.body;
    try {

        const userFound = await User.findOne({email});
        if (userFound) return res.status(400).json(["User already exists"]);

        const passwordHash=await bcrypt.hash(password,10);
        const newUser = new User({username,email, password:passwordHash});

        if (roles){
            const rolesFound = await Role.find({name : {$in: roles}})
            newUser.roles = rolesFound.map(roles => roles._id);
        }else{
            const role = await Role.findOne({name: "user"})
            newUser.roles=[role._id];
        }
   
        const userSaved= await newUser.save();
        
        
        res.json({id:userSaved._id,
            username:userSaved.username,
            email:userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });
       
    } catch (error) {
        console.log(error);
    }
    
}
export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const userFound = await User.findOne({email}).populate("roles");  
        if (!userFound) {
            return res.status(400).json(["User not found"]);
        }
        const isMatch = await bcrypt.compare(password,userFound.password);
        if (!isMatch) {
            return res.status(400).json(["Invalid password"]);
        }
        const roles= userFound.roles.map( role => role.name)
        const token = await createdAccessToken({id: userFound._id});
        res.cookie('token',token);
        res.json({id:userFound._id,
            username:userFound.username,
            email:userFound.email,
            roles:roles
        });
       
    } catch (error) {
        console.log(error);
    }
}
export const logout = (req, res) => {
    res.cookie('token', "", { expires: new Date(0) });
    return res.sendStatus(200);
}
export const profile = async(req, res) => {
    const userFound = await User.findById(req.user.id)
    if (!userFound) {
        return res.status(400).json(["User not found"]);
    }

    res.json({id:userFound._id,
        username:userFound.username,
        email:userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    });
}
export const verifyToken = async (req, res) => {
    const {token} = req.cookies;

    if (!token)  return res.status(401).json({message: 'Token is required'});
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({message: "Unauthorized"});
        const userFound = await User.findById(user.id).populate("roles");
        if (!userFound) return res.status(401).json({message: "Unauthorized"});
        const roles= userFound.roles.map( role => role.name)
        return res.json({
            id: userFound._id,
            username : userFound.username,
            email : userFound.email, 
            roles: roles
        });
    })
}

export const enviarCorreo = async (req, res) =>{
    
    const userFound = await User.findOne({email: req.body.email}).populate("roles")

    if(!userFound) return res.status(400).json({message: "User not found"})

    const token = await createdAccessTokenPass({id: userFound._id});
    const resetLink = `http://localhost:5173/resetpassword?token=${token}`;
    const mailOptions = {
      to: req.body.email,
      subject: 'Restablecimiento de contraseña',
      text: `Puedes restablecer tu contraseña haciendo clic en el siguiente enlace: ${resetLink}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error al enviar el correo '+error });
      }
      return res.status(200).json({ message: 'Correo de recuperación enviado' });
    });
}
export const resetpassword = async (req, res) =>{
    
    const { token, newPassword } = req.body;

    try {
     
        jwt.verify(token, TOKEN_SECRET, async (err, user) => {
            if (err) return res.status(401).json({message: "Unauthorized"});
            const userFound = await User.findById(user.id);
            if (!userFound) return res.status(401).json({message: "Unauthorized"});
            const passwordHash=await bcrypt.hash(newPassword,10);
            userFound.password = passwordHash;
            await userFound.save();
            return res.status(200).json({ message: 'Contraseña restablecida con éxito' });
        })
      
    } catch (err) {
      return res.status(400).json({ message: 'Token no válido o expirado' });
    }
}