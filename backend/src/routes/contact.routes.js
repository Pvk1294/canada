import { Router } from "express";
import { handleContactForm } from "../controllers/contact.controller.js";

const router = Router();

router.post("/send", handleContactForm);

export default router;
