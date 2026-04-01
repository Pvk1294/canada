import { Router } from "express";
import { handleSubmitLead } from "../controllers/leads.controller.js";

const router = Router();

router.post("/submit", handleSubmitLead);

export default router;
