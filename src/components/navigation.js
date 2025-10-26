import { endMessage } from "./startEndMessage.js";
import { goUp, changeDirectory, listDirectory } from "./changeDir.js";

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
    case ".exit":
      endMessage();
      break;
    default:
      console.log(`Invalid input`);
  }
};

export { nwd };
