import "./env";
import cors from "cors";
import express from "express";
import { startDevRouter } from "./router/devRouter";
import { runAgentTask } from "./agent/agent";
import { validateSession } from "./validation/validate";

startDevRouter();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/run-agent", async (_req, res) => {
  const result = await runAgentTask();
  res.json(result);
});

app.post("/run", async (_req, res) => {
  const result = await runAgentTask();
  res.json({ ok: true, result });
});

app.get("/validate/:sessionId", async (req, res) => {
  const result = await validateSession(Number(req.params.sessionId));
  res.json(result);
});

app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});
