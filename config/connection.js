import mongoose from "mongoose"

async function connectToDb(){
    try {
        await mongoose.connect("mongodb://localhost:27017")
        console.log("connected to db")
    } catch (error) {
        console.error("error connecting", error)
    }
}
export default connectToDb