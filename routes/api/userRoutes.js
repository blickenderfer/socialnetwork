import express from "express"
import {findUsers, findUser, updateUser, createUser, deleteUser, addFriend, deleteFriend} from "../../controllers/userController.js"
const router = express.Router()

router.route("/").get(findUsers).post(createUser)

router.route("/:id").get(findUser).put(updateUser).delete(deleteUser)

router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend)

export default router

