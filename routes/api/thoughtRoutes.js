import express from "express"
import {findSingleThought, findThoughts, updateThought, createThought, deleteThought} from "../../controllers/thoughtController.js"
const router = express.Router()

router.route("/").get(findThoughts).post(createThought)

router.route("/:id").get(findSingleThought).put(updateThought).delete(deleteThought)


export default router