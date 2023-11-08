import Estacion from "../models/Estacion.model";


export const getEstaciones = async(req, res) => {
    try {
        const estacion = await Estacion.find();
        res.json(estacion)
    } catch (error) {
        return res.status(404).json({message: "Error "+error.message});
    }
};
export const createEstacion = async(req, res) => {
    try {
        const { nombre, latitud, longitud } = req.body
        const newEstacion = new Estacion({
            nombre,
            latitud,
            longitud
        })

        const saveEstacion = await newEstacion.save();
        res.json(saveEstacion);
    } catch (error) {
        return res.status(404).json({message: "Error "+error.message});
    }
};
export const getEstacion = async(req, res) => {
    try {
        const estacion = await Estacion.findById(req.params.id)
        if (!estacion) {
            return res.status(404).json({
                message: "Estacion not found"
            })
        }
        res.json(estacion)
    } catch (error) {
        return res.status(404).json({message: "Estacion not found"})
    }
};
export const updateEstacion = async(req, res) => {
    try {
        const estacion = await Estacion.findByIdAndUpdate(req.params.id, req.body,{new : true})
        if (!estacion) {
            return res.status(404).json({
                message: "Estacion not found"
            });
        }
        res.json(estacion);
    } catch (error) {
        return res.status(404).json({message: "Estacion not found"})
    }
};
export const deleteEstacion = async(req, res) => {
    try {
        const estacion = await Estacion.findByIdAndDelete(req.params.id);
        if (!estacion) {
            return res.status(404).json({
                message: "Estacion not found"
            });
        }
        res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({message: "Estacion not found"})
    }
};
