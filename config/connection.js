import mongoose from "mongoose"

async function connectToDb(){
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/socialnetworkapi")
        console.log("connected to db")
    } catch (error) {
        console.error("error connecting", error)
    }
}
export default connectToDb