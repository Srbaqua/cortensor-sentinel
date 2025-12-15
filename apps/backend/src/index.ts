import "./env";
import cors from "cors";
import express from "express";
import { startDevRouter } from "./router/devRouter";
import { runAgentTask } from "./agent/agent";
import { validateSession } from "./validation/validate";
import { validateSessionAsValidator } from "./validator/validator";

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
  const result = await runAgentTask(
    "Summarize the latest activity in this repository",
    "consistent"
  );
  res.json(result);
});

app.post("/run", async (req, res) => {
  const { prompt, mode } = req.body;

  const result = await runAgentTask(
    prompt ?? "Summarize the latest activity in this repository",
    mode ?? "consistent"
  );

  res.json({ ok: true, result });
});



app.get("/validate/:sessionId", async (req, res) => {
  try {
    const sessionId = Number(req.params.sessionId);
    const result = await validateSessionAsValidator(sessionId);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});
