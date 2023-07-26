import express from "express"
import thoughtController from "./api/thoughtRoutes.js"
import userController from "./api/.js"
const router = express.Router()
router.use("/api/users", userController)
router.use("/api/thoughts", thoughtController)
export default router