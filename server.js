import bodyParser from "body-parser";
import cors from "cors";
import db from "./config/database.js";
import express from "express";
import router from "./routes/routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

try {
    await db.authenticate();
    console.log("Database connected");
}
catch (error) {
    console.log(error);
}

app.use(router);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
