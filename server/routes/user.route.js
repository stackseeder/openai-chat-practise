import express from "express";
import { body } from "express-validator";
import { userRegister, userSignIn } from "../controllers/user.controller.js";
import { tokenAuth } from "../middlewares/token.middleware.js"
import { validate } from "../utils/validator.js"

const router = express.Router();

router.post(
  "/signup",
  body("username")
    .exists().withMessage("username required")
    .isLength({ min: 6 }).withMessage("username min 6")
    .isLength({ max: 15 }).withMessage("username max 15"),
  body("password")
    .exists().withMessage("password required")
    .isLength({ min: 8 }).withMessage("password min 8"),
  validate,
  userRegister
);

router.post(
  "/signin",
  body("username")
    .exists().withMessage("username required")
    .isLength({ min: 6 }).withMessage("username min 6"),
  body("password")
    .exists().withMessage("password required")
    .isLength({ min: 8 }).withMessage("password min 8"),
  validate,
  userSignIn
);

router.get(
  "/check-token",
  tokenAuth,
  (req,res) => res.status(200).json({
    username: req.user.username
  })
);

export default router;