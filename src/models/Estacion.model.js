import {Schema, model} from "mongoose";
const estacionSchema= new Schema({
    nombre: {
        type: String,
        required:true,
        unique:true,
    },
    latitud: {
        type: Number,
        required:true,
    },
    longitud: {
        type: Number,
        required:true,
    }
}, 
{
    timestamps: true
}
);

export default model('Estacion', estacionSchema)