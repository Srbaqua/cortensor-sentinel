# Cortensor Sentinel

**Decentralized Agentic Monitoring & Validation Platform**

Cortensor Sentinel is a production-grade agentic application built on **Cortensor’s decentralized inference protocol**. It runs AI agents, validates their outputs using **redundant inference**, computes **Proof-of-Useful-Work (PoUW)** via semantic consensus, and exposes **transparent, inspectable trust evidence** through a modern observability dashboard.

> **Core idea:** AI agents should not just *act* — they should *prove why their outputs can be trusted*.

---

## 🚩 Problem

As AI agents become autonomous and decentralized, users are asked to blindly trust inference outputs without:

* Any proof that results are correct or consistent
* Visibility into disagreement across inference nodes
* Independent validation or auditability
* Observable trust signals (agreement, outliers, usefulness)

Existing agentic systems often rely on **single-node inference** and provide **opaque results**, making them unsuitable for critical or public-good use cases.

---

## 💡 Solution

Cortensor Sentinel introduces a **validation and observability layer** for agentic applications built on Cortensor.

It:

* Runs agent tasks using Cortensor Router sessions
* Collects **redundant inference outputs** (PoI)
* Validates results via an **independent validator service**
* Computes **PoUW** using semantic consensus and outlier detection
* Produces **attestation artifacts** (evidence hash)
* Visualizes everything in a real-time dashboard

This turns AI inference into a **trustable, auditable, and inspectable process**.

---

## 🏗️ Architecture

```
┌────────────┐
│   Frontend │  (Next.js + shadcn/ui)
│ Dashboard  │  Observability & Controls
└─────┬──────┘
      │ REST
      ▼
┌────────────┐
│  Backend   │  (Node.js + Express)
│  Agent     │  Agent execution
│  Validator │  Independent validation
└─────┬──────┘
      │ Web2 API
      ▼
┌────────────┐
│ Cortensor  │  Router Node
│  Router    │  Sessions & inference
└────────────┘
```

**Trust boundaries are explicit**:

* Agents do not validate themselves
* Validators fetch and score outputs independently
* UI only observes validator attestations

---

## 🔑 Key Features

### 🤖 Agentic Execution

* User-triggered AI agent runs
* Multi-miner / multi-task inference per session
* Prompt and execution modes controlled via UI

### 🔁 Proof-of-Inference (PoI)

* Redundant inference across simulated miners
* Session-based task tracking
* Full output history preserved

### 🧠 Proof-of-Useful-Work (PoUW)

* Semantic similarity–based validation
* Consensus ratio calculation
* Outlier detection (Byzantine tolerance)

```json
"pouw": {
  "pouwScore": 0.72,
  "consensusRatio": 0.66,
  "outliers": 1,
  "method": "semantic-consensus"
}
```

### 🔐 Validation & Attestations

* Independent validator service
* Deterministic SHA-256 evidence hashing
* Attestation metadata (ERC-8004–ready)

```json
"attestation": {
  "evidenceHash": "9f4c3e…",
  "hashAlg": "sha256",
  "attestedBy": "validator-service-1",
  "anchor": "off-chain (on-chain ready)"
}
```

### 📊 Observability Dashboard

* Session & task metrics
* PoUW score visualization
* Validator identity
* Evidence hash display
* Execution timeline

---

## 🎛️ Controlled Validation Demo (Very Important)

The dashboard allows controlled experiments to **prove PoUW behavior**:

| Mode       | Description               | Expected Outcome            |
| ---------- | ------------------------- | --------------------------- |
| Consistent | Same prompt to all miners | PoUW ≈ 100%, no outliers    |
| Variant    | Slight prompt variations  | PoUW decreases slightly     |
| Byzantine  | Faulty / unrelated miner  | PoUW drops, outliers appear |

This demonstrates that **PoUW is an emergent property of agreement**, not a fixed score.

---

## 🧪 How to Run Locally

### Prerequisites

* Node.js 18+
* Docker (for Cortensor Router or Dev Router)

### Backend

```bash
cd apps/backend
npm install
npm run dev
```

### Frontend

```bash
cd apps/frontend
npm install
npm run dev
```

Open:

```
http://localhost:3000/dashboard
```

---

## 🔌 Cortensor Integration

* Uses **Cortensor Web2 REST API**
* Session-based completions
* Task and output retrieval
* Validator-side fetching (no self-reporting)
* Designed to integrate `/validate` endpoints and future COR Prover surfaces

---

## 🧭 Hackathon Alignment (Hackathon #3)

| Requirement               | Status |
| ------------------------- | ------ |
| Agentic Applications      | ✅      |
| PoI / PoUW Utilization    | ✅      |
| Validation & Attestations | ✅      |
| Observability & Tooling   | ✅      |
| Public-Good Orientation   | ✅      |
| Modern UI & Demo          | ✅      |

Bonus-ready:

* ERC-8004 artifact structure
* On-chain anchoring narrative
* Validator role separation

---

## 🚀 Why This Matters

Cortensor Sentinel demonstrates how decentralized AI can be:

* **Trustworthy** (via redundant inference)
* **Auditable** (via validator attestations)
* **Transparent** (via open observability)
* **Useful** (via PoUW scoring)

This project fills a critical gap between **raw decentralized inference** and **real-world agentic applications**.

---

## 📌 Future Work

* Real multi-node miner integration
* On-chain anchoring of evidence hashes
* Validator reputation scoring
* Historical analytics & miner performance dashboards

---

## 👤 Author

**Saurabh Chaudhary**
B.Tech CSE, NIT Hamirpur

---

> *Built for Cortensor Hackathon #3 — pushing agentic AI beyond inference into verifiable trust.*
