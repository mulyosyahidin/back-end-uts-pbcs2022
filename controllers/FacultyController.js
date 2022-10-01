import { response, formatErrorValidation } from "../helper/global.js";
import Faculty from "../models/Faculty.js";
import { validationResult } from "express-validator";

const index = async (req, res) => {
  try {
    const faculties = await Faculty.findAll();

    res.status(200).json(response(true, faculties));
  } catch (error) {
    res.status(500).json(store(false, null, error.message));
  }
};

const show = async (req, res) => {
  try {
    const faculty = await Faculty.findByPk(req.params.id);

    if (faculty) {
      res.status(200).json(response(true, faculty));
    } else {
      res.status(404).json(response(false, null, "Data fakultas tidak ditemukan"));
    }
  } catch (error) {
    res.status(500).json(response(false, null, error.message));
  }
};

const store = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json(response(false, null, formatErrorValidation(errors.array())));
        }

        const faculty = await Faculty.create(req.body);

        res.status(201).json(response(true, faculty, "Berhasil menambahkan fakultas"));
    }
    catch (error) {
        res.status(500).json(response(false, null, error.message));
    }
};

const update = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json(response(false, null, formatErrorValidation(errors.array())));
        }

        const faculty = await Faculty.findByPk(req.params.id);

        if (faculty) {
            await faculty.update(req.body);

            res.status(200).json(response(true, faculty, "Berhasil memperbarui data fakultas"));
        }
        else {
            res.status(404).json(response(false, null, "Data fakultas tidak ditemukan"));
        }
    }
    catch (error) {
        res.status(500).json(response(false, null, error.message));
    }
};

const destroy = async (req, res) => {
    try {
        const faculty = await Faculty.findByPk(req.params.id);

        if (faculty) {
            await faculty.destroy();

            res.status(200).json(response(true, null, "Berhasil menghapus data fakultas"));
        }
        else {
            res.status(404).json(response(false, null, "Data fakultas tidak ditemukan"));
        }
    }
    catch (error) {
        res.status(500).json(response(false, null, error.message));
    }
};

export const FacultyController = { index, show, store, update, destroy };