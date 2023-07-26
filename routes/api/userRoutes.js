import Thought from "../../models/Thought.js"
import User from "../../models/User.js"
import express from "express"
const router = express.Router()

router.get("/", findUsers)

router.get("/:id", findUser)

router.put("/:id", updateUser)

router.post("/", createUser)

router.delete("/:id", deleteUser)

router.post("/:userId/friends/:friendId", addFriend)

router.delete("/:userId/friends/:friendId", deleteFriend)

export default router

