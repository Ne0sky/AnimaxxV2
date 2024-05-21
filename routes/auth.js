import express from "express";
import passport from "passport";
import { register, login } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "https://animaxx.vercel.app/popular",
    failureRedirect: "https://animaxx.vercel.app/login",
  })
);

export default router;
