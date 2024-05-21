import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import corsOption from "./config/cors.js";
import { configureGoogleAuth } from "./utils/googleAuth.js";
import { currDir } from "./config/resPath.js";

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

try {
  mongoose.connect(process.env.DATABASE);
  console.log("db connected");
} catch (error) {
  console.log("Error:", error);
}

app.use(cors(corsOption));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//setup passport
app.use(passport.initialize());
app.use(passport.session());

configureGoogleAuth();

app.get("/login/success", async (req, res) => {
  if (req.user) {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
    res.status(200).json({
      message: "User Authenticated",
      token,
      user: {
        id: req.user._id,
        email: req.user.email,
        displayName: req.user.displayName,
        image: req.user.image,
      },
    });
  } else {
    res.status(400).json({
      message: "User Not Authenticated",
    });
  }
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("https://animaxx.vercel.app/");
  });
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "client", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
