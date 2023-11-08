import mongoose from "mongoose";

//mongoose.connect('mongodb+srv://yerson2812:isabelap2812@cluster0.kp0seo8.mongodb.net/?retryWrites=true&w=majority')
//.then(() => console.log("Conectadooo"))
//.catch((error) => console.error(error));
export const conncetDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://yerson2812:isabelap2812@cluster0.kp0seo8.mongodb.net/?retryWrites=true&w=majority');
       
        console.log("DB connceted");
    } catch (error) {
        console.log(error)
    }
}