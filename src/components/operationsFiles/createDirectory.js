import fs from "fs";
import { getCurrentWorkingDirectory } from "../changeDir.js";

const createDirectory = async (directoryName) => {
  const PATH = `${getCurrentWorkingDirectory()}\\${directoryName}`;
  fs.readdir(PATH, (error) => {
    if (error) {
      fs.mkdir(PATH, (err) => {
        if (err) {
          console.log(
            "Error creating directory. The folder may be write-protected."
          );
        } else {
          console.log(`directory ${directoryName} created`);
        }
      });
    } else {
      console.log("A directory with this name already exists.");
    }
  });
};

export { createDirectory };
