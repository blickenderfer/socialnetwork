const { Schema, model } = require("mongoose"); 

const userSchema = new Schema({
    username: {
        type: DataTypes.STRING,
        unique: true,
        required: true,
        trimmed: true,
        
    },
    email: {
        type: DataTypes.STRING,
        required: true,
        trimmed: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Must be a valid email."]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "thought"
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }]
},{
    toJSON: {
        virtuals: true,
        getters: true,
    }
}) 

userSchema.virtual("friendCount").get(function(){
    return this.friends.length
})

const User = model("user", userSchema)
module.exports = User