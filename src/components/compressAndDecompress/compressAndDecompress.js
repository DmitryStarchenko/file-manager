import zlib from "zlib";
import fs from "fs";
import path from "path";

const compressAndDecompress = async (paths, arg = "") => {
  const data = paths.split(" ");
  let FILE_PATH;
  let NEW_DIRECTORY_PATH;
  if (!data[0]) {
    console.log("❌ You must enter the file path and folder path ❌");
    return;
  } else if (!data[1]) {
    console.log("❌ You have not entered a new directory ❌");
    return;
  } else {
    FILE_PATH = data[0];
    const basename = path.basename(FILE_PATH);
    NEW_DIRECTORY_PATH = `${data[1]}\\${basename.slice(
      0,
      basename.lastIndexOf(".")
    )}.${arg === "" ? "br" : "txt"}`;
  }

  fs.access(FILE_PATH, fs.constants.F_OK, (err) => {
    if (err) {
      console.log("❌ The source file does not exist ❌");
    }
  });

  try {
    const readStream = fs.createReadStream(FILE_PATH);
    const compressStream =
      arg === "" ? zlib.createBrotliCompress() : zlib.createBrotliDecompress();
    const writeStream = fs.createWriteStream(NEW_DIRECTORY_PATH);
    readStream.pipe(compressStream).pipe(writeStream);
    console.log(
      `${arg === "" ? "✅ Compression complete" : "✅ Decompression complete"}`
    );
  } catch (error) {
    console.error(
      `❌ ${arg === "" ? "Compression" : "Decompression"} error: ${
        error.message
      } ❌`
    );
  }
};

export { compressAndDecompress };
