import mongoose from 'mongoose'

export const connectDB=async()=>{
    try {
      await mongoose.connect(process.env.MONGODB_URL)
      console.log("MONGODB Connected Succesfully")
    } catch (error) {
       console.error("Error Connecting to MONGODB",error) 
       process.exit(1)
    }
}