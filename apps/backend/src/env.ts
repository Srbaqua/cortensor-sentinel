import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(__dirname, "../../../.env"),
});

if (!process.env.CORTENSOR_ROUTER_URL) {
  throw new Error(" CORTENSOR_ROUTER_URL not loaded");
}

console.log("ENV loaded:", process.env.CORTENSOR_ROUTER_URL);
