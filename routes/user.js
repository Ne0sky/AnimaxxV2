import express from "express";
const router = express.Router();
import {
  getAnimes,
  likeUnlikePlaylist,
  getPlaylists,
  addToPlaylist,
  createPlaylist,
  removeFromPlaylist,
  deletePlaylist,
  editPlaylist
} from "../controllers/userActions.js";
import { verifyUser } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

router.post("/add-to-playlist", verifyUser, addToPlaylist);
router.post("/remove-from-playlist/:playlistId/:animeId", verifyUser, removeFromPlaylist);
router.post("/delete-playlist", verifyUser, deletePlaylist)
router.get("/playlist", verifyUser, getPlaylists);
router.post("/create-playlist", verifyUser, upload.single('image'), createPlaylist);
router.post("/get-animes", verifyUser, getAnimes);
router.post("/playlist/likeunlike/:playlistId", verifyUser, likeUnlikePlaylist); 
router.post("/playlist/edit/:playlistId", verifyUser, upload.single('image'), editPlaylist);

export default router;
