import fs from "fs";
import { getPath } from "../getPath.js";

const deleteFile = (filePath) => {
  const path = getPath(filePath);
  if (!path) return;

  fs.unlink(path, (error) => {
    if (error) {
      console.log("❌ File deletion error ❌");
    } else {
      console.log("✅ File deleted");
    }
  });
};

export { deleteFile };
