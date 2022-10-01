import express from "express";
import { FacultyController } from "../controllers/FacultyController.js";
import { StudyProgramController } from "../controllers/StudyProgramController.js";
import { FacultyRequest } from "../requests/FacultyRequest.js";
import { StudyProgramRequest } from "../requests/StudyProgramRequest.js";

const router = express.Router();

router.get("/faculties", FacultyController.index);
router.get("/faculties/:id", FacultyController.show);
router.post("/faculties", FacultyRequest.store, FacultyController.store);
router.patch("/faculties/:id", FacultyRequest.update, FacultyController.update);
router.delete("/faculties/:id", FacultyController.destroy);

router.get("/study-programs", StudyProgramController.index);
router.get("/study-programs/:id", StudyProgramController.show);
router.post("/study-programs", StudyProgramRequest.store, StudyProgramController.store);
router.patch("/study-programs/:id", StudyProgramRequest.update, StudyProgramController.update);
router.delete("/study-programs/:id", StudyProgramController.destroy);

export default router;
