import {z} from 'zod'

const temperaturaSchema = z.object({
    valor: z.number({
        required_error:"Valor of temperature is required"
    }),
    unidad: z.string({
        required_error:"Unit of temperature is required"
    })
});
  
const humedadSchema = z.object({
    valor: z.number({
        required_error:"Valor of humidity is required"
    }),
    unidad: z.string({
        required_error:"Unit of humidity is required"
    })
});
  
const presionSchema = z.object({
    valor: z.number({
        required_error:"Valor of pressure is required"
    }),
    unidad: z.string({
        required_error:"Unit of pressure is required"
    })
});
  
const velocidadVientoSchema = z.object({
    valor: z.number({
        required_error:"Valor of velocity is required"
    }),
    unidad: z.string({
        required_error:"Unit of velocity is required"
    })
});
  
const direccionVientoSchema = z.string({
    required_error:"Direction of velocity is required"
});
  
const precipitacionSchema = z.object({
    valor: z.number({
        required_error:"Valor of precipitation is required"
    }),
    unidad: z.string({
        required_error:"Unit of precipitation is required"
    })
});
export const estacionSchema = z.object({
    nombre: z.string({
        required_error:"nombre is required"
    }),
    latitud: z.number({
        required_error:"latitud is required"
    }),
    longitud: z.number({
        required_error:"latitud is required"
    })
});


const ClimaSchema = z.object({
    fecha_hora: z.string({
        required_error:"Date of station is required"
    }),
    temperatura: temperaturaSchema,
    humedad: humedadSchema,
    presion_atmosferica: presionSchema,
    viento: z.object({
      velocidad: velocidadVientoSchema,
      direccion: direccionVientoSchema
    }),
    precipitacion: precipitacionSchema
});

export const climaSchema = z.object({
    data:z.array(ClimaSchema),
    estacion : z.string({
        required_error:"Date of station is required"
    })
});