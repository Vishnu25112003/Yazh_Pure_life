import { Router } from "express";
import { asyncHandler } from "../asyncHandler.js";
import { pool } from "../db.js";

export const serviceRequestsRouter = Router();

const PHONE_RE = /^[6-9]\d{9}$/;

serviceRequestsRouter.post("/", asyncHandler(async (req, res) => {
  const { name, phone, customerId, address, complaint } = req.body ?? {};

  if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 60) {
    return res.status(400).json({ error: "Enter your name (2-60 characters)." });
  }
  if (typeof phone !== "string" || !PHONE_RE.test(phone.trim())) {
    return res.status(400).json({ error: "Enter a valid 10-digit mobile number." });
  }
  if (typeof customerId !== "string" || customerId.trim().length < 1 || customerId.trim().length > 30) {
    return res.status(400).json({ error: "Enter your customer ID (up to 30 characters)." });
  }
  if (typeof address !== "string" || address.trim().length < 5 || address.trim().length > 250) {
    return res.status(400).json({ error: "Enter your address (5-250 characters)." });
  }
  if (typeof complaint !== "string" || complaint.trim().length < 5 || complaint.trim().length > 200) {
    return res.status(400).json({ error: "Describe the issue (5-200 characters)." });
  }

  const result = await pool.query(
    "INSERT INTO service_requests (name, phone, customer_id, address, complaint) VALUES ($1, $2, $3, $4, $5) RETURNING id, created_at",
    [name.trim(), phone.trim(), customerId.trim(), address.trim(), complaint.trim()]
  );

  res.status(201).json(result.rows[0]);
}));

serviceRequestsRouter.get("/", asyncHandler(async (_req, res) => {
  const result = await pool.query(
    "SELECT id, name, phone, customer_id, address, complaint, created_at FROM service_requests ORDER BY created_at DESC LIMIT 100"
  );
  res.json(result.rows);
}));
