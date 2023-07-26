import Thought from "../models/Thought"

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
    if(!user){
        return res.status(404).json({message: "Thought not found"})
    }
    keys.forEach(key => user[key] = req.body[key])
    const updatedThought = await thought.save()
    res.json(updatedThought)
    } catch (error) {
        console.error("Error updating thought", error)
        res.status(500).json({message: "server error"})
    }
}

const createThought = async (req, res) => {
    try {
        const thought = await Thought.create({username: req.body.username, email: req.body.email})
        res.json(thought)
    } catch (error) {
        console.error("Error creating thought", error)
        res.status(500).json({message: "server error"})
    }
}

const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id)
        await Promise.all(user.thoughts.map(thoughtId => Thought.deleteOne({_id:thoughtId})))
        const deletion = await User.deleteOne({_id: req.params.id})
        if(!deletion){
            return res.status(404).json({message: "Thought not found"})
        }
        res.json({message: "Thought deleted"})
    } catch (error) {
        console.error("Error deleting thought", error)
        res.status(500).json({message: "server error"})
    }
}