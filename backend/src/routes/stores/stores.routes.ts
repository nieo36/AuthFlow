import express from "express"; 
import {getStore,postStore} from "../../controllers/store/stores.controller.js";
import { checkAdmin } from "../../middleware/auth.js";
export const stores=express.Router();

stores.get("/",getStore);
stores.post("/",checkAdmin,postStore);


