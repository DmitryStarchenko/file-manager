import { endMessage } from "./startEndMessage.js";
import { goUp, changeDirectory, listDirectory } from "./changeDir.js";
import { readFile } from "./readFile.js";

const nwd = async (command, pathToDirectory = "") => {
  switch (command) {
    case "up":
      goUp();
      break;
    case "cd":
      await changeDirectory(pathToDirectory);
      break;
    case "ls":
      await listDirectory();
      break;
    case "cat":
      await readFile(pathToDirectory);
      break;
    case "add":
      createFile();
      break;
    case "mkdir":
      createDirectory();
      break;
    case "rn":
      renameFile();
      break;
    case "cp":
      copyFile();
      break;
    case "mv":
      moveFile();
      break;
    case "rm":
      deleteFile();
      break;
    case ".exit":
      endMessage();
      break;
    default:
      console.log(`Invalid input`);
  }
};

export { nwd };
