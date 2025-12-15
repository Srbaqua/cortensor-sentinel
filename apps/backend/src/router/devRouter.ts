import express from "express";

export function startDevRouter() {
  const router = express();
  router.use(express.json());

  let taskId = 0;
  const tasks: Record<number, any[]> = {};


  router.get("/api/v1/info", (_req, res) => {
    res.json({ name: "dev-router", status: "ok" });
  });


const miners = ["dev-miner-1", "dev-miner-2", "dev-miner-3"];

router.post("/api/v1/completions/:sessionId", (req, res) => {
  const { prompt } = req.body;
  const sessionId = Number(req.params.sessionId);

  const outputs = miners.map((miner, i) => ({
    task_id: taskId++,
    miner,
    text:
      i === 0
        ? `DEV RESPONSE: ${prompt.substring(0, 50)}`
        : `DEV RESPONSE VARIANT ${i}: ${prompt.substring(0, 50)}`
  }));

  if (!tasks[sessionId]) tasks[sessionId] = [];
  tasks[sessionId].push(...outputs);

  res.json({ session_id: sessionId, outputs });
});

router.post("/api/v1/completions/:sessionId", (req, res) => {
  const { prompt } = req.body;
  const sessionId = Number(req.params.sessionId);

  const outputs = miners.map((miner, index) => ({
    task_id: taskId++,
    miner,
    text:
      index === 0
        ? `DEV RESPONSE: ${prompt.substring(0, 50)}`
        : `DEV RESPONSE VARIANT ${index}: ${prompt.substring(0, 50)}`
  }));

  if (!tasks[sessionId]) tasks[sessionId] = [];
  tasks[sessionId].push(...outputs);

  res.json({
    session_id: sessionId,
    outputs
  });
});

router.get("/api/v1/tasks/:sessionId", (req, res) => {
  const sessionId = Number(req.params.sessionId);
  res.json(tasks[sessionId] || []);
});


  router.listen(5010, () => {
    console.log("✅ Dev Router running on http://localhost:5010");
  });
}
