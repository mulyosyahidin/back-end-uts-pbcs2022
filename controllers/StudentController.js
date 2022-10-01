import { response, formatErrorValidation } from "../helper/global.js";
import { validationResult } from "express-validator";
import Student from "../models/Student.js";

const index = async (req, res) => {
    try {
        const students = await Student.findAll({
            include: [
                {
                    association: "study_program",
                },
            ],
        });

        res.status(200).json(response(true, students));
    } catch (error) {
        res.status(500).json(response(false, null, error.message));
    }
}

const show = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id, {
            include: [
                {
                    association: "study_program",
                },
            ],
        });

        if (student) {
            res.status(200).json(response(true, student));
        } else {
            res.status(404).json(response(false, null, "Data mahasiswa tidak ditemukan"));
        }
    } catch (error) {
        res.status(500).json(response(false, null, error.message));
    }
}

const store = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res
                .status(422)
                .json(response(false, null, formatErrorValidation(errors.array())));
        }

        const student = await Student.create(req.body);

        res
            .status(201)
            .json(response(true, student, "Berhasil menambahkan mahasiswa"));
    } catch (error) {
        res.status(500).json(response(false, null, error.message));
    }
}

const update = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res
                .status(422)
                .json(response(false, null, formatErrorValidation(errors.array())));
        }

        const student = await Student.findByPk(req.params.id);

        if (student) {
            await student.update(req.body);

            res
                .status(200)
                .json(response(true, student, "Berhasil mengubah data mahasiswa"));
        } else {
            res.status(404).json(response(false, null, "Data mahasiswa tidak ditemukan"));
        }
    } catch (error) {
        res.status(500).json(response(false, null, error.message));
    }
}

const destroy = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);

        if (student) {
            await student.destroy();

            res
                .status(200)
                .json(response(true, null, "Berhasil menghapus data mahasiswa"));
        } else {
            res.status(404).json(response(false, null, "Data mahasiswa tidak ditemukan"));
        }
    } catch (error) {
        res.status(500).json(response(false, null, error.message));
    }
}

export const StudentController = { index, show, store, update, destroy };
