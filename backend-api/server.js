// server.js - Backend API U3 en CommonJS
const express = require("express");
const cors = require("cors");

const app  = express();
const port = process.env.PORT || 4000; // usamos puerto 4000

app.use(cors());
app.use(express.json());

// ------- Datos en memoria -------
let categories = [
  { id: 1, name: "Electrónica" },
  { id: 2, name: "Ropa" },
  { id: 3, name: "Hogar" },
];

let products = [
  {
    id        : 1,
    name      : "Smartphone X",
    description: "Teléfono inteligente de 6.5 pulgadas",
    price     : 350.0,
    imageUrl  : "https://via.placeholder.com/300x200?text=Smartphone+X",
    categoryId: 1,
    stock     : 10,
  },
  {
    id        : 2,
    name      : "Audífonos Bluetooth",
    description: "Audífonos inalámbricos con cancelación de ruido",
    price     : 50.0,
    imageUrl  : "https://via.placeholder.com/300x200?text=Audifonos",
    categoryId: 1,
    stock     : 25,
  },
  {
    id        : 3,
    name      : "Camiseta básica",
    description: "Camiseta de algodón, unisex",
    price     : 12.5,
    imageUrl  : "https://via.placeholder.com/300x200?text=Camiseta",
    categoryId: 2,
    stock     : 50,
  },
  {
    id        : 4,
    name      : "Pantalón deportivo",
    description: "Pantalón cómodo para hacer ejercicio",
    price     : 25.0,
    imageUrl  : "https://via.placeholder.com/300x200?text=Pantalon",
    categoryId: 2,
    stock     : 20,
  },
  {
    id        : 5,
    name      : "Lámpara de escritorio",
    description: "Lámpara LED ajustable para escritorio",
    price     : 18.0,
    imageUrl  : "https://via.placeholder.com/300x200?text=Lampara",
    categoryId: 3,
    stock     : 15,
  },
];

let nextProductId = products.length + 1;

// ---------- Validación ----------
function validateProduct(body) {
  const errors = [];

  if (!body.name || typeof body.name !== "string" || body.name.trim().length < 3) {
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
      name       : body.name?.trim(),
      description: body.description?.trim() || "",
      price,
      stock,
      categoryId,
      imageUrl   : body.imageUrl?.trim(),
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

app.get("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({ message: "Producto no encontrado" });
  res.json(product);
});

app.post("/api/products", (req, res) => {
  const { isValid, errors, value } = validateProduct(req.body);
  if (!isValid) return res.status(400).json({ message: "Datos inválidos", errors });

  const newProduct = { id: nextProductId++, ...value };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Producto no encontrado" });

  const { isValid, errors, value } = validateProduct(req.body);
  if (!isValid) return res.status(400).json({ message: "Datos inválidos", errors });

  const updated = { id, ...value };
  products[index] = updated;
  res.json(updated);
});

app.delete("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Producto no encontrado" });

  const deleted = products.splice(index, 1)[0];
  res.json({ message: "Producto eliminado", product: deleted });
});

// ---------- Arranque ----------
app.listen(port, () => {
  console.log(`Servidor API U3 escuchando en puerto ${port}`);
});
