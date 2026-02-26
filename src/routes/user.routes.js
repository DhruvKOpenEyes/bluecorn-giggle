
import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", (req, res, next) => UserController.register(req, res, next));
router.post("/login", (req, res, next) => UserController.login(req, res, next));

router.get("/admin-only",
  authenticate,
  authorize("admin"),
  (req, res) => res.json({ message: "Admin access granted" })
);

export default router;
