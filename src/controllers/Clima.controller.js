import Clima from "../models/Clima";
import Estacion from "../models/Estacion.model";


export const getClima = async (req, res) => {
    try {
        const climas = await Clima.find().populate("estacion");
        res.json(climas);
    } catch (error) {
        res.status(403).json(error)
    }
    
} 
export const getClimaById = async (req, res) => {
    try {
        const clima= await Clima.findById(req.params.climaId).populate("estacion");
        if(!clima) return res.status(400).json({message: "Clima not found"})
        res.status(200).json(clima)
    } catch (error) {
        res.status(403).json(error)
    }
    
} 
export const updateClimaById = async (req, res) => {
    const updateClima=await Clima.findByIdAndUpdate(req.params.climaId, req.body, {
        new: true
    })
    if(!updateClima) return res.status(400).json({message: "Clima not found"})
    res.status(200).json(updateClima)
} 
export const deleteClimaById = async (req, res) => {
    const deleteClima=await Clima.findByIdAndDelete(req.params.climaId)
    if(!deleteClima) return res.status(400).json({message: "Clima not found"})
    res.status(204).json({message: "Clima delete"})
} 

export const setClima =  async(req, res) => {
    try {
        
        const {data, estacion} = req.body;

        const estacionFound = await Estacion.findOne({_id: estacion});
        if(!estacionFound) return res.status(400).json({message: "Estacion not found"})

        const  clima = data.map(dat =>{
            return {
                ...dat,
                estacion: estacion
            }   
        })
        const saveClima = await Clima.insertMany(clima)
    
        res.json(saveClima)
    } catch (error) {
        res.status(403).json(error)
    }
}