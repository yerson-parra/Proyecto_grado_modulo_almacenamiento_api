import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import pkg from '../package.json';
import climaRoutes from './routes/Clima.routes'
import authRoutes from './routes/auth.routes'
import estacionesRoutes from './routes/estacion.routes'
import swaggerJSDoc from 'swagger-jsdoc';
import  SwaggerUI from 'swagger-ui-express';
import path from 'path';
import { createRoles } from './libs/initialSetup.js';
import cookieParser from 'cookie-parser';

const swaggerSpec={
    definition:{
        openapi:"3.0.0",
        info:{
            title: "API DE CLIMA",
            version: "1.0.0"
        },
        servers:[
            {
                url:"http://localhost:5000"
            },
        ],
    },
    apis:[path.join(__dirname,'./routes/Clima.routes.js' )]
};

const app = express()
createRoles()
app.set('pkg',pkg);
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
    origin: ['http://localhost:5173', '*'],
    credentials : true
}))
app.get('/', (req, res)=>{
    res.json({
        nombre: app.get('pkg').name,
        author: app.get('pkg').author,
        descripcion: app.get('pkg').description,
        version: app.get('pkg').version
    })
})


app.use('/api', climaRoutes)
app.use('/api', authRoutes)
app.use('/api', estacionesRoutes)


app.use("/api-doc",SwaggerUI.serve, SwaggerUI.setup(swaggerJSDoc(swaggerSpec)));
export default app;