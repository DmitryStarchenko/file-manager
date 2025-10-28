import fs from "fs";
import { getCurrentWorkingDirectory } from "../changeDir.js";

const renameFile = async (files) => {
  const data = files.split(" ");
  let CURRENT_FILE_PATH;
  let NEW_FILE_PATH;
  if (!data[0]) {
    console.log("❌ You must enter the file path and file name. ❌");
    return;
  } else if (!data[1]) {
    console.log("❌ You have not entered a new file name ❌");
    return;
  } else {
    CURRENT_FILE_PATH = data[0];
    NEW_FILE_PATH = `${getCurrentWorkingDirectory()}\\${data[1]}`;
  }

  fs.access(NEW_FILE_PATH, fs.constants.F_OK, (err) => {
    if (err) {
      fs.rename(CURRENT_FILE_PATH, NEW_FILE_PATH, (err) => {
        if (err) {
          console.log("❌ Error renaming file ❌");
        } else {
          console.log("🆗 Rename complete");
        }
      });
    } else {
      console.log("❌ A file with this name already exists ❌");
    }
  });
};

export { renameFile };
