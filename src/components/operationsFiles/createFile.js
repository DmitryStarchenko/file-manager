import fs from "fs";
import { getCurrentWorkingDirectory } from "../changeDir.js";

const createFile = async (fileName) => {
  if (fileName === "") {
    console.log("❌ You must enter the file name ❌");
    return;
  }
  const PATH = `${getCurrentWorkingDirectory()}\\${fileName}`;
  fs.readFile(PATH, (error) => {
    if (error) {
      fs.writeFile(PATH, "", (err) => {
        if (err) {
          console.log(
            "❌ Error creating file. The folder may be write-protected ❌"
          );
        } else {
          console.log(`✅ File ${fileName} created`);
        }
      });
    } else {
      console.log("❌ A file with this name already exists ❌");
    }
  });
};

export { createFile };
