import fs from "fs";
import path from "path";
import { getCurrentWorkingDirectory } from "../changeDir.js";
import { getPath } from "../getPath.js";

const renameFile = async (paths) => {
  const [sourcePath, newFileName] = paths.trim().split(" ");

  if (!sourcePath || !newFileName) {
    console.log("❌ You must enter both file path and target directory ❌");
    return;
  }

  if (!path.extname(sourcePath) || !path.extname(newFileName)) {
    console.log("❌ You must enter a file with extension ❌");
    return;
  }

  const CURRENT_FILE_PATH = getPath(sourcePath);
  if (!CURRENT_FILE_PATH) return;

  const NEW_FILE_PATH = path.join(getCurrentWorkingDirectory(), newFileName);

  fs.access(NEW_FILE_PATH, fs.constants.F_OK, (err) => {
    if (err) {
      fs.rename(CURRENT_FILE_PATH, NEW_FILE_PATH, (err) => {
        if (err) {
          console.log("❌ Error renaming file ❌");
        } else {
          console.log("✅ Rename complete");
        }
      });
    } else {
      console.log("❌ A file with this name already exists ❌");
    }
  });
};

export { renameFile };
