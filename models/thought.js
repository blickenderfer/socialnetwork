import mongoose from "mongoose";
const { Schema, model } = mongoose; 

const thoughtSchema = new Schema({
    thoughtText: {
        type: DataTypes.STRING,
        /*required*/
        /*must be between 1 and 128 characters*/
    },
    createdAt: {
        /*date,
        set default value to current timestamp,
        use a getter method to format the timestamp on query*/
    },
    username: {
        type: DataTypes.STRING,
        /*allowNull: false, I'm assuming*/
    },
    reactions: {
        reactionId: {
            
        }
    }
})