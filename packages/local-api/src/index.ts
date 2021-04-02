import express from "express";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";

import { cellsRouter } from "./routes/cell";

export const serve = (
  port: number,
  fileName: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();
  app.use(cellsRouter(fileName, dir));

  if (useProxy) {
    app.use(
      createProxyMiddleware({
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true,
      })
    );
  } else {
    const packagePath = require.resolve(
      "@jsnotes/local-client/build/index.html"
    );

    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};
