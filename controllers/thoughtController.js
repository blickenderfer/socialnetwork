import Thought from "../models/Thought.js"
import User from "../models/User.js"
import express from "express"
const router = express.Router()

export const findThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find()
        res.json(thoughts)
    } catch (error) {
        console.error("Error fetching thought", error)
        res.status(500).json({message: "server error"})
    }
}

export const findSingleThought = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id)
        if(!thought){
            return res.status(404).json({message: "Thought not found"})
        }
        res.json(thought.toObject({virtuals: true}))
    } catch (error) {
        console.error("Error fetching thought", error)
        res.status(500).json({message: "server error"})
    }
}

export const updateThought = async (req, res) => {
    let keys = Object.keys(req.body)
    try {
        const thought = await Thought.findById(req.params.id)
    if(!thought){
        return res.status(404).json({message: "Thought not found"})
    }
    keys.forEach(key => thought[key] = req.body[key])
    const updatedThought = await thought.save()
    res.json(updatedThought)
    } catch (error) {
        console.error("Error updating thought", error)
        res.status(500).json({message: "server error"})
    }
}

export const createThought = async (req, res) => {
    console.log(req.body.userId)
    try {
        const user = await User.findById(req.body.userId)
        if (!user) {
            return res.status(404).json({message: "User not found"})
        }
        const thought = await Thought.create({thoughtText: req.body.thoughtText, username: user.username, userId: req.body.userId})
        user.thoughts.push(thought._id)
        res.json(thought)
    } catch (error) {
        console.error("Error creating thought", error)
        res.status(500).json({message: "server error"})
    }
}

export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id)
        const user = await User.findOne({username:thought.username})
        const deletion = await Thought.deleteOne({_id: req.params.id})
        if(!deletion){
            return res.status(404).json({message: "Thought not found"})
        }
        const newThoughts = user.thoughts.filter(th => th._id != req.params.id)
        user.thoughts = newThoughts
        await user.save()
        res.json(user)
    } catch (error) {
        console.error("Error deleting thought", error)
        res.status(500).json({message: "server error"})
    }
}