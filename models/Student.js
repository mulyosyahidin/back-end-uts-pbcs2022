import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Study_program from "./Study_program.js";

const { DataTypes } = Sequelize;

const Student = db.define("students", {
  id: {
    type: DataTypes.BIGINT(20),
    primaryKey: true,
    autoIncrement: true,
  },
  study_program_id: {
    type: DataTypes.BIGINT(20).UNSIGNED,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  npm: {
    type: DataTypes.STRING(16),
    allowNull: false,
  },
});

Student.belongsTo(Study_program, {
  foreignKey: "study_program_id",
  as: "study_program",
});

export default Student;
