import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Faculty from "./Faculty.js";

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

Study_program.belongsTo(Faculty, {
    foreignKey: "faculty_id",
    as: "faculty",
});

export default Study_program;