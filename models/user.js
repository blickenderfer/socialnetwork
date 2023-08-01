import mongoose from "mongoose"
const { Schema, SchemaTypes, model} = mongoose

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value){
                const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
                return emailRegex.test(value) 
            },
            message: "Invalid email address"
        }
    },
    thoughts: [{
        type: SchemaTypes.ObjectId,
        ref: "Thought"
    }],
    friends: [{
        type: SchemaTypes.ObjectId,
        ref: "User"
    }]
}) 

userSchema.virtual("friendCount").get(function(){
    return this.friends.length
})

const User = model("User", userSchema)
export default User