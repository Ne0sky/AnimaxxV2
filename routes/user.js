import express from "express";
const router = express.Router();
import {
  getAnimes,
  likePlaylist,
  getPlaylists,
  addToPlaylist,
  createPlaylist,
  removeFromPlaylist,
  unlikePlaylist,
} from "../controllers/userActions.js";
import { verifyUser } from "../middleware/auth.js";

router.post("/add-to-playlist", verifyUser, addToPlaylist);
router.post("/remove-from-playlist", verifyUser, removeFromPlaylist);
router.get("/playlist", verifyUser, getPlaylists);
router.post("/create-playlist", verifyUser, createPlaylist);
router.post("/get-animes", getAnimes);
router.get("/playlist/:id/like", verifyUser, likePlaylist); // send the playlist id as a param
router.get("/playlist/:id/unlike", verifyUser, unlikePlaylist); 

export default router;
