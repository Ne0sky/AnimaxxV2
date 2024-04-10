import mongoose from "mongoose";
const DB = process.env.DATABASE
try {
    mongoose.connect(DB).then(()=>console.log('DB connected')).catch((err)=> console.log(err))
} catch (error) {
    console.log("Error:", error);
}

