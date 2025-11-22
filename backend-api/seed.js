// seed.js - Semilla de datos para MercApp (U3)
const fs   = require("fs");
const path = require("path");

const dataDir        = path.join(__dirname, "data");
const categoriesFile = path.join(dataDir, "categories.json");
const productsFile   = path.join(dataDir, "products.json");

// Asegurar que la carpeta data existe
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// 4 categorías
const categories = [
  { id: 1, name: "Electrónica" },
  { id: 2, name: "Ropa" },
  { id: 3, name: "Hogar" },
  { id: 4, name: "Deportes" },
];

// 10 productos de ejemplo
const products = [
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
    name      : "Mouse inalámbrico",
    description: "Mouse ergonómico para uso diario",
    price     : 18.5,
    imageUrl  : "https://via.placeholder.com/300x200?text=Mouse",
    categoryId: 1,
    stock     : 30,
  },
  {
    id        : 4,
    name      : "Camiseta básica",
    description: "Camiseta de algodón, unisex",
    price     : 12.5,
    imageUrl  : "https://via.placeholder.com/300x200?text=Camiseta",
    categoryId: 2,
    stock     : 50,
  },
  {
    id        : 5,
    name      : "Pantalón deportivo",
    description: "Pantalón cómodo para hacer ejercicio",
    price     : 25.0,
    imageUrl  : "https://via.placeholder.com/300x200?text=Pantalon",
    categoryId: 2,
    stock     : 20,
  },
  {
    id        : 6,
    name      : "Chaqueta ligera",
    description: "Chaqueta rompevientos para clima fresco",
    price     : 40.0,
    imageUrl  : "https://via.placeholder.com/300x200?text=Chaqueta",
    categoryId: 2,
    stock     : 15,
  },
  {
    id        : 7,
    name      : "Lámpara de escritorio",
    description: "Lámpara LED ajustable para escritorio",
    price     : 18.0,
    imageUrl  : "https://via.placeholder.com/300x200?text=Lampara",
    categoryId: 3,
    stock     : 15,
  },
  {
    id        : 8,
    name      : "Batidora de mano",
    description: "Batidora para cocina con 3 velocidades",
    price     : 32.0,
    imageUrl  : "https://via.placeholder.com/300x200?text=Batidora",
    categoryId: 3,
    stock     : 8,
  },
  {
    id        : 9,
    name      : "Balón de fútbol",
    description: "Balón tamaño 5 para cancha de césped",
    price     : 22.0,
    imageUrl  : "https://via.placeholder.com/300x200?text=Balon",
    categoryId: 4,
    stock     : 18,
  },
  {
    id        : 10,
    name      : "Zapatillas deportivas",
    description: "Zapatillas para running",
    price     : 60.0,
    imageUrl  : "https://via.placeholder.com/300x200?text=Zapatillas",
    categoryId: 4,
    stock     : 12,
  },
];

fs.writeFileSync(categoriesFile, JSON.stringify(categories, null, 2), "utf8");
fs.writeFileSync(productsFile, JSON.stringify(products, null, 2), "utf8");

console.log("✅ Datos de ejemplo guardados en data/categories.json y data/products.json");
