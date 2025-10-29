import { endMessage } from "./startEndMessage.js";
import { goUp, changeDirectory, listDirectory } from "./changeDir.js";
import {
  readFile,
  createFile,
  createDirectory,
  renameFile,
  copyOrMoveFile,
  deleteFile,
} from "./operationsFiles/index.js";
import { systemInfo } from "./systemInfo/systemInfo.js";
import { hashFile } from "./hashFile/hashFile.js";
import { compress } from "./compressAndDecompress/compress.js";

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
      deleteFile(arg);
      break;
    case "os":
      systemInfo(arg);
      break;
    case "hash":
      await hashFile(arg);
      break;
    case "compress":
      await compress(arg);
      break;
    case ".exit":
      endMessage();
      break;
    default:
      console.log(`❌ Invalid input ❌`);
  }
};

export { nwd };
