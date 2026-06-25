import express from "express";
import {stores} from "./stores/stores.routes.js";
import { auth } from "./auth/auth.routes.js";
import { requireAuth } from "../middleware/auth.js";

const api=express.Router();

api.use("/stores",requireAuth,stores);
api.use("/auth",auth);

export {api};