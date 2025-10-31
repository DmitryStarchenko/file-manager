import fs from "fs";
import { getPath } from "../getPath.js";

const readFile = (filePath) => {
  const path = getPath(filePath);
  if (!path) return;

  const stream = fs.createReadStream(path);
  stream.on("error", () => {
    console.log("❌ Error reading file ❌");
  });
  stream.pipe(process.stdout);
  stream.on("end", () => {
    console.log("\n");
  });
};

export { readFile };
