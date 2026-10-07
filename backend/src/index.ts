import "dotenv/config";
import cors from "cors";
import express from "express";
import { ensureSchema } from "./db.js";
import { serviceRequestsRouter } from "./routes/serviceRequests.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/service-requests", serviceRequestsRouter);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

ensureSchema()
  .then(() => {
    app.listen(port, () => {
      console.log(`Yazh Pure Life API listening on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database schema", err);
    process.exit(1);
  });
