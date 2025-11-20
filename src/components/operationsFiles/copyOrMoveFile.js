import fs from "fs";
import path from "path";
import { getPath } from "../getPath.js";

const copyOrMoveFile = async (paths, move = "") => {
  const [sourcePath, targetDir] = paths.trim().split(" ");

  if (!sourcePath || !targetDir) {
    console.log("❌ You must enter both file path and target directory ❌");
    return;
  }

  if (!path.extname(sourcePath)) {
    console.log("❌ You must enter a file with extension ❌");
    return;
  }

  const FILE_PATH = getPath(sourcePath);
  if (!FILE_PATH) return;

  const dirPath = getPath(targetDir);
  if (!dirPath) return;

  const NEW_FILE_PATH = path.join(dirPath, path.basename(FILE_PATH));

  fs.access(FILE_PATH, fs.constants.F_OK, (err) => {
    if (err) {
      console.log("❌ The source file does not exist ❌");
      return;
    }
  });

  const readStream = fs.createReadStream(FILE_PATH);
  const writeStream = fs.createWriteStream(NEW_FILE_PATH);
  try {
    return new Promise((resolve, reject) => {
      readStream.on("error", () => {
        reject(console.log(`❌ Error reading file ❌`));
        return;
      });

      writeStream.on("error", () => {
        reject(
          console.log(
            `❌ Error writing file. The folder may be write-protected ❌`
          )
        );
        return;
      });

      writeStream.on("finish", () => {
        if (move === "") {
          resolve(console.log("✅ The file was copied successfully."));
        } else {
          fs.unlink(FILE_PATH, () => {});
          resolve(console.log("✅ The file was moved successfully."));
        }
      });

      readStream.pipe(writeStream);
    });
  } catch (error) {
    console.log(`❌ Copy error ❌: ${error}`);
    return;
  }
};

export { copyOrMoveFile };
