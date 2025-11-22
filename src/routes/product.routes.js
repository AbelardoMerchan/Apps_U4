import { Router } from "express";
const router = Router();

// Este archivo se monta en "/products" desde server.js
router.get("/", (_req, res) => {
  res.render("products/list", { title: "Productos", items: [] });
});

router.get("/__ping", (_req, res) => res.send("products ok"));

export default router;
