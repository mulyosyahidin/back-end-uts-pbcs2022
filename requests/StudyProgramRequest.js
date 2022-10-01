import { check } from "express-validator";
import Faculty from "../models/Faculty.js";
import Study_program from "../models/Study_program.js";

const store = [
  check("faculty_id")
    .notEmpty()
    .withMessage("Fakultas harus diisi")
    .isNumeric()
    .withMessage("Fakultas harus berupa angka")
    .custom(async (value) => {
      if (!value) {
        return;
      }

      const faculty = await Faculty.findByPk(value);
      if (!faculty) {
        return Promise.reject("Fakultas tidak ditemukan");
      }
    }),
  check("name")
    .notEmpty()
    .withMessage("Nama program studi harus diisi")
    .isLength({ min: 4, max: 255 })
    .withMessage("Nama program studi harus antara 4 - 255 karakter"),
  check("code")
    .notEmpty()
    .withMessage("Kode program studi harus diisi")
    .isLength({ min: 1, max: 1 })
    .withMessage("Kode program studi harus 1 karakter")
    .custom(async (value, { req, loc, path }) => {
      if (!value) {
        return;
      }

      const checkIsExist = await Study_program.findOne({
        where: { faculty_id: req.body.faculty_id, code: value },
      });
      if (checkIsExist) {
        return Promise.reject("Kode program studi sudah digunakan");
      }
    }),
];

const update = [
  check("faculty_id")
    .notEmpty()
    .withMessage("Fakultas harus diisi")
    .isNumeric()
    .withMessage("Fakultas harus berupa angka")
    .custom(async (value, { req }) => {
      if (!value) {
        return;
      }

      const faculty = await Faculty.findByPk(value);
      if (!faculty) {
        return Promise.reject("Fakultas tidak ditemukan");
      }
    }),
  check("name")
    .notEmpty()
    .withMessage("Nama program studi harus diisi")
    .isLength({ min: 4, max: 255 })
    .withMessage("Nama program studi harus antara 4 - 255 karakter"),
  check("code")
    .notEmpty()
    .withMessage("Kode program studi harus diisi")
    .isLength({ min: 1, max: 1 })
    .withMessage("Kode program studi harus 1 karakter")
    .custom(async (value, { req }) => {
      if (!value) {
        return;
      }

      const checkIsExist = await Study_program.findOne({
        where: { faculty_id: req.body.faculty_id, code: value },
      });
      if (checkIsExist) {
        return Promise.reject("Kode program studi sudah digunakan");
      }
    }),
];

export const StudyProgramRequest = { store, update };
