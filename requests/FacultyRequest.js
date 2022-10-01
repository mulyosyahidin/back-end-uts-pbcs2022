import { check } from 'express-validator';
import Faculty from '../models/Faculty.js';

const storeFaculty = [
    check('name')
        .notEmpty()
        .withMessage('Nama fakultas harus diisi')
        .isLength({ min: 4, max: 255 })
        .withMessage('Nama fakultas harus antara 4 - 255 karakter'),
    check('code')
        .notEmpty()
        .withMessage('Kode fakultas harus diisi')
        .isLength({ min: 1, max: 1 })
        .withMessage('Kode fakultas harus 1 karakter')
        .custom(async (value) => {
            if (!value) {
                return;
            }
            
            const faculty = await Faculty.findOne({ where: { code: value } });
            if (faculty) {
                return Promise.reject('Kode fakultas sudah digunakan');
            }
        }),
];

const updateFaculty = [
    check('name')
        .notEmpty()
        .withMessage('Nama fakultas harus diisi')
        .isLength({ min: 4, max: 255 })
        .withMessage('Nama fakultas harus antara 4 - 255 karakter'),
    check('code')
        .notEmpty()
        .withMessage('Kode fakultas harus diisi')
        .isLength({ min: 1, max: 1 })
        .withMessage('Kode fakultas harus 1 karakter')
        .custom(async (value, { req }) => {
            if (!value) {
                return;
            }

            const faculty = await Faculty.findOne({ where: { code: value } });
            if (faculty && faculty.id !== req.params.id) {
                return Promise.reject('Kode fakultas sudah digunakan');
            }
        }),
];

export { storeFaculty, updateFaculty };