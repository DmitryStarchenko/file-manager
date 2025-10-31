import fs from "fs";
import { getCurrentWorkingDirectory } from "../changeDir.js";

const createFile = async (fileName) => {
  const regex = /[,\|/;№@%&]/;
  if (fileName === "") {
    console.log("❌ You must enter the file name ❌");
    return;
  } else if (regex.test(fileName)) {
    console.log("❌ Symbols are not allowed. Simply enter the file name ❌");
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
