import { Router } from "express";
const router = Router();

router.get("/", (_req, res) => res.send("Servidor funcionando correctamente ✅"));
router.get("/__ping", (_req, res) => res.send("index ok"));

export default router;
