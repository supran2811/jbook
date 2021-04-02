import path from "path";
import { Command } from "commander";
import { serve } from "@jsnotes/local-api";

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
  .command("serve [fileName]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "Port to run the file", "4005")
  .action(async (fileName = "notebook.js", options: { port: string }) => {
    const dir = path.join(process.cwd(), path.dirname(fileName));
    try {
      await serve(
        parseInt(options.port),
        path.basename(fileName),
        dir,
        !isProduction
      );
      console.log(`Serving on ${options.port}`);
    } catch (err) {
      if (err.code === "EADDRINUSE") {
        console.log(
          "Error::: Port already in use , try different port using -p option"
        );
      } else {
        console.log(err.message);
      }
    }
  });
