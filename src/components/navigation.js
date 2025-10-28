import { endMessage } from "./startEndMessage.js";
import { goUp, changeDirectory, listDirectory } from "./changeDir.js";
import {
  readFile,
  createFile,
  createDirectory,
  renameFile,
  copyOrMoveFile,
} from "./operationsFiles/index.js";

const nwd = async (command, arg = "") => {
  switch (command) {
    case "up":
      goUp();
      break;
    case "cd":
      await changeDirectory(arg);
      break;
    case "ls":
      await listDirectory();
      break;
    case "cat":
      readFile(arg);
      break;
    case "add":
      await createFile(arg);
      break;
    case "mkdir":
      createDirectory(arg);
      break;
    case "rn":
      renameFile(arg);
      break;
    case "cp":
      copyOrMoveFile(arg);
      break;
    case "mv":
      copyOrMoveFile(arg, "mv");
      break;
    case "rm":
      deleteFile();
      break;
    case ".exit":
      endMessage();
      break;
    default:
      console.log(`❌ Invalid input ❌`);
  }
};

export { nwd };
