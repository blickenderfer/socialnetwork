const { Schema, model } = require("mongoose"); 

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 128
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date)=>date.toLocaleDateString()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},{
    toJSON: {
        virtuals: true,
        getters: true
    }
})

thoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length
})

const Thought = model("thought", thoughtSchema)
module.exports = Thought