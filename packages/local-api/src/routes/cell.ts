import express, { Router } from "express";
import path from "path";
import fs from "fs/promises";

interface Cell {
  id: string;
  content: string;
  type: "text" | "code";
}

export const cellsRouter = (fileName: string, dir: string) => {
  const router = Router();

  const fullPath = path.join(dir, fileName);

  router.use(express.json());

  router.get("/cells", async (req, res) => {
    try {
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });
      res.send(JSON.parse(result));
    } catch (err) {
      if (err.code === "ENOENT") {
        await fs.writeFile(fullPath, "[]", { encoding: "utf-8" });
        res.send([]);
      } else {
        throw err;
      }
    }
  });

  router.post("/cells", async (req, res) => {
    const cells: Cell[] = req.body;
    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");

    res.send({ status: "ok" });
  });

  return router;
};
