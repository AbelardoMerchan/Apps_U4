import Product from "../models/Product.js";

export const listProducts = async (_req, res) => {
  const items = await Product.find().lean();
  res.render("products/list", { title: "Productos", items });
};

export const newForm = (_req, res) => {
  res.render("products/new", { title: "Nuevo producto" });
};

export const createProduct = async (req, res) => {
  const { name, price } = req.body;
  await Product.create({ name, price: Number(price) || 0 });
  res.redirect("/products");
};
