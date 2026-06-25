import http from "http";
import dotenv from "dotenv";
import { mongoConnect } from "./config/db.js";
import app from "./app.js";

dotenv.config();
const port = Number(process.env.PORT) || 2000;
const mongo = process.env.MONGO_URI as string;
const host = "0.0.0.0";

async function start(){
await mongoConnect(mongo);

const server = http.createServer(app);

server.listen(port, host, () => {
	console.log(`Server ${host} Listening on ${port}`);
});
}
start();