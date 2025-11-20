import fs from "fs";
import crypto from "crypto";
import { getPath } from "../getPath.js";

const hashFile = async (filePath) => {
  const path = getPath(filePath);
  if (!path) return;

  const fileStream = fs.createReadStream(path);
  const hash = crypto.createHash("sha256");

  fileStream.on("data", (data) => {
    hash.update(data);
  });

  fileStream.on("end", () => {
    const fileHash = hash.digest("hex");
    console.log(`🏁 File hash: ${fileHash}`);
  });
};

export { hashFile };
