import express from "express"
import thoughtController from "./api/thoughtController.js"
import userController from "./api/userController.js"
const router = express.Router()
router.use("/api/users", userController)
router.use("/api/thoughts", thoughtController)
export default router