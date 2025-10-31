import zlib from "zlib";
import fs from "fs";
import path from "path";
import { getPath } from "../getPath.js";

const compressAndDecompress = async (paths, arg = "") => {
  const [sourcePath, targetDir] = paths.trim().split(" ");

  if (!sourcePath || !targetDir) {
    console.log("❌ You must enter both file path and target directory ❌");
    return;
  }

  if (!path.extname(sourcePath)) {
    console.log("❌ You must enter a file with extension ❌");
    return;
  }

  const isDecompression = arg !== "";
  if (isDecompression && path.extname(sourcePath) !== ".br") {
    console.log("❌ For decompression, file must have '.br' extension ❌");
    return;
  }

  const FILE_PATH = getPath(sourcePath);
  if (!FILE_PATH) return;

  const dirPath = getPath(targetDir);
  if (!dirPath) return;

  const basename = path.basename(
    FILE_PATH,
    isDecompression ? ".br" : path.extname(FILE_PATH)
  );
  const outputExtension = isDecompression ? ".txt" : ".br";
  const NEW_FILE_PATH = path.join(dirPath, `${basename}${outputExtension}`);

  try {
    const readStream = fs.createReadStream(FILE_PATH);
    const compressStream = isDecompression
      ? zlib.createBrotliDecompress()
      : zlib.createBrotliCompress();
    const writeStream = fs.createWriteStream(NEW_FILE_PATH);

    readStream.on("error", () => {
      console.log("❌ Error reading file ❌");
    });

    compressStream.on("error", () => {
      console.log(
        `❌ Error ${isDecompression ? "decompression" : "compression"} file ❌`
      );
    });

    writeStream.on("error", () => {
      console.log("❌ Error writing file ❌");
    });

    writeStream.on("finish", () => {
      console.log(
        `✅ ${isDecompression ? "Decompression" : "Compression"} complete`
      );
    });

    readStream.pipe(compressStream).pipe(writeStream);
  } catch (error) {
    console.error(
      `❌ ${isDecompression ? "Decompression" : "Compression"} error: ${
        error.message
      } ❌`
    );
    return;
  }
};

export { compressAndDecompress };
