import { Router } from "express";
const router = Router();

// Este archivo se monta en "/auth" desde server.js
router.get("/login", (_req, res) => {
  res.render("login", { title: "Ingresar" });
});

router.get("/__ping", (_req, res) => res.send("auth ok"));

export default router;
