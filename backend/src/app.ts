import express from "express";
import cors from "cors";
import { api } from "./routes/api.js";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(
	cors({
		origin: `http://localhost:5173`,
	})
);

app.use(morgan("dev"));

app.use(express.json());

app.use(cookieParser());

app.use("/api/v1", api);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

export default app;