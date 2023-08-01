import mongoose from "mongoose"
const { Schema, SchemaTypes, model } = mongoose

const reactionSchema = new Schema({
    reactionId: {
        type: SchemaTypes.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
       
    }
})

reactionSchema.virtual("reactionFormattedTimestamp").get(function(){
    return this.createdAt.toLocaleString()
})

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    reactions: [{type: reactionSchema}]
})

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length
})

thoughtSchema.virtual("formattedTimestamp").get(function () {
    return this.createdAt.toLocaleString()
})

const Thought = model("Thought", thoughtSchema)
export default Thought