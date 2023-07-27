import express from "express"
import thoughtRoutes from "./api/thoughtRoutes.js"
import userRoutes from "./api/userRoutes.js"
const router = express.Router()
router.use("/api/users", userRoutes)
router.use("/api/thoughts", thoughtRoutes)
export default router