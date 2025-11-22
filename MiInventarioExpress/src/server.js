import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app  = express();
const port = process.env.PORT || 3000;

app.get("/", (_req, res) => res.send("Servidor funcionando correctamente ✅"));

app.listen(port, () => console.log(`Servidor en puerto ${port}`));
