import express from "express"
import {findSingleThought, findThoughts, updateThought, createThought, deleteThought, addReaction, deleteReaction} from "../../controllers/thoughtController.js"
const router = express.Router()

router.route("/").get(findThoughts).post(createThought)

router.route("/:id").get(findSingleThought).put(updateThought).delete(deleteThought)

router.route("/:thoughtId/reactions").post(addReaction)

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction)


export default router