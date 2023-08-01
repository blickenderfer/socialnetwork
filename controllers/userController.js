import User from "../models/User.js"

export const findUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        console.error("Error fetching users", error)
        res.status(500).json({ message: "server error" })
    }
}

export const findUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate({ path: "thoughts", model: "Thought" })
            .populate({ path: "friends", model: "User" })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json(user.toObject({ virtuals: true }))
    } catch (error) {
        console.error("Error fetching user", error)
        res.status(500).json({ message: "server error" })
    }
}

export const updateUser = async (req, res) => {
    let keys = Object.keys(req.body)
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        keys.forEach(key => user[key] = req.body[key])
        const updatedUser = await user.save()
        res.json(updatedUser)
    } catch (error) {
        console.error("Error updating user", error)
        res.status(500).json({ message: "server error" })
    }
}

export const createUser = async (req, res) => {
    try {
        const user = await User.create({ username: req.body.username, email: req.body.email })
        res.json(user)
    } catch (error) {
        console.error("Error creating user", error)
        res.status(500).json({ message: "server error" })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        await Promise.all(user.thoughts.map(thoughtId => Thought.deleteOne({ _id: thoughtId })))
        const deletion = await User.deleteOne({ _id: req.params.id })
        if (!deletion) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json({ message: "User deleted" })
    } catch (error) {
        console.error("Error deleting user", error)
        res.status(500).json({ message: "server error" })
    }
}

export const addFriend = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        user.friends.push(req.params.friendId)
        await user.save()
        res.json(user)
    } catch (error) {
        console.error("Error adding friend", error)
        res.status(500).json({ message: "server error" })
    }
}

export const deleteFriend = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const newFriends = user.friends.filter(fr => fr._id != req.params.friendId)
        user.friends = newFriends
        await user.save()
        res.json(user)
    } catch (error) {
        console.error("Error deleting friend", error)
        res.status(500).json({ message: "server error" })
    }
}