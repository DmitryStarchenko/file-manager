import fs from "fs";
import path from "path";

const copyOrMoveFile = async (paths, move = "") => {
  const data = paths.split(" ");
  let FILE_PATH;
  let NEW_DIRECTORY_PATH;
  if (!data[1]) {
    console.log("❌ You have not entered a new directory ❌");
    return;
  } else {
    FILE_PATH = data[0];
    NEW_DIRECTORY_PATH = `${data[1]}\\${path.basename(FILE_PATH)}`;
  }

  fs.access(FILE_PATH, fs.constants.F_OK, (err) => {
    if (err) {
      console.log("❌ The source file does not exist ❌");
    }
  });

  const readStream = fs.createReadStream(FILE_PATH);
  const writeStream = fs.createWriteStream(NEW_DIRECTORY_PATH);
  try {
    return new Promise((resolve, reject) => {
      readStream.on("error", () => {
        reject(console.log(`❌ Error reading file ❌`));
      });

      writeStream.on("error", () => {
        reject(
          console.log(
            `❌ Error writing file. The folder may be write-protected ❌`
          )
        );
      });

      writeStream.on("finish", () => {
        if (move === "") {
          resolve(console.log("🆗 The file was copied successfully."));
        } else {
          fs.unlink(FILE_PATH, () => {});
          resolve(console.log("🆗 The file was moved successfully."));
        }
      });

      readStream.pipe(writeStream);
    });
  } catch (error) {
    console.log(`❌ Copy error ❌: ${error}`);
  }
};

export { copyOrMoveFile };
