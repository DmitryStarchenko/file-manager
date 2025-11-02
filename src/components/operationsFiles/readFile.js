import fs from "fs";
import { getPath } from "../getPath.js";

const readFile = (filePath) => {
  const path = getPath(filePath);
  if (!path) return;

  const stream = fs.createReadStream(path);
  stream.on("error", () => {
    console.log("❌ Error reading file ❌");
  });
  stream.on("data", (data) => {
    console.log(`🏁 ${data}`);
  });
};

export { readFile };
