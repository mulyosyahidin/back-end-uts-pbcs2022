import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Study_program = db.define("study_programs", {
    id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
    },
    faculty_id: {
        type: DataTypes.BIGINT(20).UNSIGNED,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.CHAR(1),
        allowNull: false,
    },
});

export default Study_program;