import fs from "fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mockFilePath = path.resolve(__dirname, "public/mock.json");

export default defineConfig({
  plugins: [
    react(),
    {
      name: "mock-schedule-endpoints",
      apply: "serve",
      configureServer(server) {
        server.middlewares.use("/api/mock", (req, res, next) => {
          if (!req.method) {
            next();
            return;
          }

          if (req.method === "OPTIONS") {
            res.statusCode = 204;
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            res.end();
            return;
          }

          if (req.method === "GET") {
            void fs
              .readFile(mockFilePath, "utf-8")
              .then((content) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
                res.end(content);
              })
              .catch((error) => {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ status: "error", message: (error as Error).message }));
              });
            return;
          }

          if (req.method === "POST") {
            let body = "";
            req.on("data", (chunk) => {
              body += chunk;
            });
            req.on("end", () => {
              try {
                const payload = JSON.parse(body || "{}");
                const normalized = `${JSON.stringify(payload, null, 2)}\n`;
                void fs
                  .writeFile(mockFilePath, normalized, "utf-8")
                  .then(() => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({ status: "ok" }));
                  })
                  .catch((error) => {
                    res.statusCode = 500;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({ status: "error", message: (error as Error).message }));
                  });
              } catch (error) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ status: "error", message: (error as Error).message }));
              }
            });
            return;
          }

          next();
        });
      },
    },
  ],
});
