import User from "../models/User.js";

export const getLogin = (_req, res) => res.render("login", { title: "Ingresar" });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const ok = user && (await user.comparePassword(password));
  if (!ok) return res.status(400).render("login", { title: "Ingresar", error: "Credenciales inválidas" });
  req.session.user = { id: user._id, username: user.username };
  res.redirect("/");
};

export const logout = (req, res) => req.session.destroy(() => res.redirect("/auth/login"));

export const seed = async (_req, res) => {
  const exists = await User.findOne({ username: "admin" });
  if (!exists) await User.create({ username: "admin", password: "admin123" });
  res.send("admin/admin123 listo");
};
