import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import { engine } from "express-handlebars";
import { connectDB } from "./config/db.js";
import indexRoutes from "./routes/index.routes.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Configuración del motor de plantillas Handlebars
app.engine(".hbs", engine({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "clave_dev",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 2 }, // 2 horas
  })
);

// Variables globales disponibles en las vistas
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas principales
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

// Ruta por defecto
app.use((req, res) => {
  res.status(404).send(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
});

// Conexión a la base de datos y arranque del servidor
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Servidor en puerto ${port}`));
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
};

startServer();

