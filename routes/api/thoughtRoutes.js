import Thought from "../../models/Thought.js"
import User from "../../models/User.js"
import express from "express"
import {findSingleThought, findThoughts, updateThought, createThought, deleteThought} from "../../controllers/thoughtController.js"
const router = express.Router()

router.get("/", findThoughts)

router.get("/:id", findSingleThought)

router.put("/:id", updateThought)

router.post("/", createThought)

router.delete("/:id", deleteThought)

export default router