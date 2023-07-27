import express from "express"
import thoughtRoutes from "./thoughtRoutes.js"
import userRoutes from "./userRoutes.js"
const router = express.Router()
router.use("/users", userRoutes)
router.use("/thoughts", thoughtRoutes)
export default router