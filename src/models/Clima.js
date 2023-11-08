import {Schema, model} from "mongoose";

const climaSchema= new Schema({

    fecha_hora:{
        type:Date,
        require:true
    },
    temperatura:{
        valor:{
            type:Number,
            require:true
        },
        unidad:{
            type:String,
            require:true
        }
    },
    humedad:{
        valor:{
            type:Number,
            require:true
        },
        unidad:{
            type:String,
            require:true
        }
    },
    presion_atmosferica:{
        valor:{
            type:Number,
            require:true
        },
        unidad:{
            type:String,
            require:true
        }
    },
    viento:{
        velocidad:{
            valor:{
                type:Number,
                require
            },
            unidad:{
                type:String,
                require:true
            }
        },
        direccion:{
            type : String,
            require:true
        }
    },
    precipitacion:{
        valor:{
            type:Number,
            require:true
        },
        unidad:{
            type:String,
            require:true
        }
    },
    estacion:{
        type: Schema.Types.ObjectId,
        ref: "Estacion",
        required : true
    }
}, 
{
    timestamps: true, 
    versionKey: false,
}
);

export default model('clima', climaSchema)