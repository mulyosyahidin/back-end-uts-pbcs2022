import { response, formatErrorValidation } from "../helper/global.js";
import { validationResult } from "express-validator";
import Study_program from "../models/Study_program.js";

const index = async (req, res) => {
    try {
        const studyPrograms = await Study_program.findAll();
    
        res.status(200).json(response(true, studyPrograms));
    } catch (error) {
        res.status(500).json(response(false, null, error.message));
    }
};

const show = async (req, res) => {
    try {
        const studyProgram = await Study_program.findByPk(req.params.id);
    
        if (studyProgram) {
            res.status(200).json(response(true, studyProgram));
        } else {
            res.status(404).json(response(false, null, "Data program studi tidak ditemukan"));
        }
    } catch (error) {
        res.status(500).json(response(false, null, error.message));
    }
};

const store = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json(response(false, null, formatErrorValidation(errors.array())));
    }

    const studyProgram = await Study_program.create(req.body);

    res
      .status(201)
      .json(response(true, studyProgram, "Berhasil menambahkan program studi"));
  } catch (error) {
    res.status(500).json(response(false, null, error.message));
  }
};

const update = async (req, res) => {
    try {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            return res
                .status(422)
                .json(response(false, null, formatErrorValidation(errors.array())));
        }
    
        const studyProgram = await Study_program.findByPk(req.params.id);
    
        if (studyProgram) {
            await studyProgram.update(req.body);
    
            res.status(200).json(response(true, studyProgram, "Berhasil memperbarui data program studi"));
        } else {
            res.status(404).json(response(false, null, "Data program studi tidak ditemukan"));
        }
    } catch (error) {
        res.status(500).json(response(false, null, error.message));
    }
};

const destroy = async (req, res) => {
    try {
        const studyProgram = await Study_program.findByPk(req.params.id);
    
        if (studyProgram) {
            await studyProgram.destroy();
    
            res.status(200).json(response(true, null, "Berhasil menghapus data program studi"));
        } else {
            res.status(404).json(response(false, null, "Data program studi tidak ditemukan"));
        }
    } catch (error) {
        res.status(500).json(response(false, null, error.message));
    }
};

export const StudyProgramController = { index, show, store, update, destroy };
