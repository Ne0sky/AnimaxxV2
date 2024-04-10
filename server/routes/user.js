import express from "express";
const router = express.Router();
import { addToPlaylist } from "../controllers/userActions.js";
import { removeFromPlaylist } from "../controllers/userActions.js";
import { getPlaylists } from "../controllers/userActions.js";
import {verifyUser} from '../middleware/auth.js'
import {createPlaylist} from '../controllers/userActions.js'
import { getAnimes } from "../controllers/userActions.js";

router.post("/add-to-playlist", verifyUser, addToPlaylist );
router.post("/remove-from-playlist", verifyUser, removeFromPlaylist );
router.get("/playlist", verifyUser, getPlaylists );
router.post("/create-playlist", verifyUser, createPlaylist );
router.post("/get-animes",  getAnimes );
export default router;