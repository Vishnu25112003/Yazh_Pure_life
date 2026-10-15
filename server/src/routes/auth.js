import { Router } from "express";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import { HttpError, parse, wrap } from "../http.js";
import { findAdminByEmail, findAdminById } from "../repo/admin.js";
import { loginSchema } from "../schemas.js";

export const authRouter = Router();

// Compared against when the email is unknown so response time does not reveal which emails exist.
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 12);

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many login attempts. Try again in 15 minutes." },
});

authRouter.post("/login", loginLimiter, wrap(async (req, res) => {
  const { email, password } = parse(loginSchema, req.body);
  const admin = await findAdminByEmail(email);
  const ok = await bcrypt.compare(password, admin?.password_hash ?? DUMMY_HASH);
  if (!admin || !ok) throw new HttpError(401, "Incorrect email or password");

  // New session id on login to prevent session fixation.
  await new Promise((resolve, reject) => req.session.regenerate((e) => (e ? reject(e) : resolve())));
  req.session.adminId = admin.id;
  res.json({ email: admin.email });
}));

authRouter.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("yazh.sid");
    res.json({ ok: true });
  });
});

authRouter.get("/me", wrap(async (req, res) => {
  const admin = req.session.adminId ? await findAdminById(req.session.adminId) : null;
  if (!admin) throw new HttpError(401, "Not signed in");
  res.json({ email: admin.email });
}));

export const requireAuth = wrap(async (req, _res, next) => {
  if (!req.session.adminId) throw new HttpError(401, "Not signed in");
  next();
});

// Session cookies are SameSite=Strict; additionally require a custom header on writes so a
// cross-site form post can never reach the admin API.
export function requireAjaxHeader(req, _res, next) {
  if (req.method !== "GET" && req.get("x-requested-with") !== "XMLHttpRequest") {
    return next(new HttpError(403, "Forbidden"));
  }
  next();
}
