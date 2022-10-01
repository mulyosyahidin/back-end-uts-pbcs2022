import express from "express";
import { index, show, store, update, destroy } from "../controllers/FacultyController.js";
import { storeFaculty, updateFaculty } from "../requests/FacultyRequest.js";

const router = express.Router();

router.get("/faculties", index);
router.get("/faculties/:id", show);
router.post("/faculties", storeFaculty, store);
router.patch("/faculties/:id", updateFaculty, update);
router.delete("/faculties/:id", destroy);

export default router;
