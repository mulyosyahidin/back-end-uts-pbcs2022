import { check } from "express-validator";
import Student from "../models/Student.js";
import Study_program from "../models/Study_program.js";

const store = [
    check("study_program_id")
        .notEmpty()
        .withMessage("Program studi harus diisi")
        .isNumeric()
        .withMessage("Program studi harus berupa angka")
        .custom(async (value) => {
            if (!value) {
                return;
            }

            const studyProgram = await Study_program.findByPk(value);
            if (!studyProgram) {
                return Promise.reject("Program studi tidak ditemukan");
            }
        }
    ),
    check("name")
        .notEmpty()
        .withMessage("Nama mahasiswa harus diisi")
        .isLength({ min: 4, max: 255 })
        .withMessage("Nama mahasiswa harus antara 4 - 255 karakter"),
    check("npm")
        .notEmpty()
        .withMessage("NPM harus diisi")
        .isLength({ min: 9, max: 9 })
        .withMessage("NPM harus 9 karakter")
        .custom(async (value) => {
            if (!value) {
                return;
            }

            const checkIsExist = await Student.findOne({
                where: { npm: value },
            });

            if (checkIsExist) {
                return Promise.reject("NPM sudah terdaftar");
            }
        }),
];

const update = [
    check("study_program_id")
        .notEmpty()
        .withMessage("Program studi harus diisi")
        .isNumeric()
        .withMessage("Program studi harus berupa angka")
        .custom(async (value) => {
            if (!value) {
                return;
            }

            const studyProgram = await Study_program.findByPk(value);
            if (!studyProgram) {
                return Promise.reject("Program studi tidak ditemukan");
            }
        }),
    check("name")
        .notEmpty()
        .withMessage("Nama mahasiswa harus diisi")
        .isLength({ min: 4, max: 255 })
        .withMessage("Nama mahasiswa harus antara 4 - 255 karakter"),
    check("npm")
        .notEmpty()
        .withMessage("NPM harus diisi")
        .isLength({ min: 9, max: 9 })
        .withMessage("NPM harus 9 karakter")
        .custom(async (value, { req }) => {
            if (!value) {
                return;
            }

            const checkIsExist = await Student.findOne({
                where: { npm: value },
            });

            if (checkIsExist && checkIsExist.id != req.params.id) {
                return Promise.reject("NPM sudah terdaftar");
            }
        }),
];

export const StudentRequest = { store, update };