// server.js - Backend API U3 en CommonJS
const express = require("express");
const cors = require("cors");
const fs      = require("fs");
const path    = require("path");

const app = express();
const port = process.env.PORT || 4000; // usamos puerto 4000
const dataDir        = path.join(__dirname, "data");
const categoriesFile = path.join(dataDir, "categories.json");
const productsFile   = path.join(dataDir, "products.json");

// funciones para cargar y guardar
function loadJson(filePath, defaultValue) {
  try {
    if (!fs.existsSync(filePath)) {
      return defaultValue;
    }
    const content = fs.readFileSync(filePath, "utf8");
    return JSON.parse(content);
  } catch (err) {
    console.error("Error leyendo", filePath, err);
    return defaultValue;
  }
}

function saveJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}


app.use(cors());
app.use(express.json());


/// Cargar datos desde los archivos JSON (semilla)
let categories = loadJson(categoriesFile, []);
let products   = loadJson(productsFile, []);

// Calcular siguiente ID disponible
let nextProductId = products.reduce(
  (max, p) => (p.id > max ? p.id : max),
  0
) + 1;

// ---------- Validación ----------
function validateProduct(body) {
  const errors = [];

  if (
    !body.name ||
    typeof body.name !== "string" ||
    body.name.trim().length < 3
  ) {
    errors.push("El nombre es obligatorio y debe tener al menos 3 caracteres.");
  }

  if (body.description && typeof body.description !== "string") {
    errors.push("La descripción debe ser texto.");
  }

  const price = Number(body.price);
  if (Number.isNaN(price) || price <= 0) {
    errors.push("El precio debe ser un número mayor que 0.");
  }

  const stock = Number(body.stock);
  if (!Number.isInteger(stock) || stock < 0) {
    errors.push("El stock debe ser un número entero mayor o igual a 0.");
  }

  const categoryId = Number(body.categoryId);
  if (
    Number.isNaN(categoryId) ||
    !categories.some((c) => c.id === categoryId)
  ) {
    errors.push("La categoría es obligatoria y debe existir.");
  }

  if (!body.imageUrl || typeof body.imageUrl !== "string") {
    errors.push("La URL de la imagen es obligatoria.");
  }

  return {
    isValid: errors.length === 0,
    errors,
    value: {
      name: body.name?.trim(),
      description: body.description?.trim() || "",
      price,
      stock,
      categoryId,
      imageUrl: body.imageUrl?.trim(),
    },
  };
}

// ---------- Rutas ----------
app.get("/", (req, res) => {
  res.send("BACKEND U3 – API funcionando ✅");
});

app.get("/api/categories", (req, res) => {
  res.json(categories);
});

app.get("/api/products", (req, res) => {
  const { search, categoryId } = req.query;
  let result = [...products];

  if (search) {
    const term = String(search).toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );
  }

  if (categoryId) {
    const catId = Number(categoryId);
    result = result.filter((p) => p.categoryId === catId);
  }

  res.json(result);
});

app.put("/api/products/:id", (req, res) => {
  const id    = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Producto no encontrado" });

  const { isValid, errors, value } = validateProduct(req.body);
  if (!isValid) return res.status(400).json({ message: "Datos inválidos", errors });

  const updated = { id, ...value };
  products[index] = updated;

  // guardar cambios
  saveJson(productsFile, products);

  res.json(updated);
});


app.post("/api/products", (req, res) => {
  const { isValid, errors, value } = validateProduct(req.body);
  if (!isValid) return res.status(400).json({ message: "Datos inválidos", errors });

  const newProduct = { id: nextProductId++, ...value };
  products.push(newProduct);

  // guardar cambios
  saveJson(productsFile, products);

  res.status(201).json(newProduct);
});


app.put("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1)
    return res.status(404).json({ message: "Producto no encontrado" });

  const { isValid, errors, value } = validateProduct(req.body);
  if (!isValid)
    return res.status(400).json({ message: "Datos inválidos", errors });

  const updated = { id, ...value };
  products[index] = updated;
  res.json(updated);
});

app.delete("/api/products/:id", (req, res) => {
  const id    = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Producto no encontrado" });

  const deleted = products.splice(index, 1)[0];

  // guardar cambios
  saveJson(productsFile, products);

  res.json({ message: "Producto eliminado", product: deleted });
});


// --- 404 genérico para cualquier otra ruta ---
app.use((req, res, next) => {
  res.status(404).json({ message: "Recurso no encontrado" });
});

// --- Manejo de errores 500 (error interno) ---
app.use((err, req, res, next) => {
  console.error("Error no controlado:", err);
  res.status(500).json({ message: "Error interno del servidor" });
});


// ---------- Arranque ----------
app.listen(port, () => {
  console.log(`Servidor API U3 escuchando en puerto ${port}`);
});
