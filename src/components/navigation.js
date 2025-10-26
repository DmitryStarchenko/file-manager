import os from "os";
import path from "path";
import fs from "fs";
import { runEnd } from "./start-end.js";

const currentPath = () => {
  const platform = os.platform();
  const username = os.userInfo().username;

  if (platform === "win32") {
    const systemDrive = process.env.SYSTEMDRIVE || "C:";
    return path.join(systemDrive, "Users", username);
  } else if (platform === "darwin") {
    return path.join("/Users", username);
  } else {
    return path.join("/home", username);
  }
};

let currentWorkingDirectory = currentPath();

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
      runEnd();
      break;
    default:
      console.log(`Invalid input`);
  }
};

const goUp = () => {
  const parentDir = path.dirname(currentWorkingDirectory);
  if (parentDir !== currentWorkingDirectory) {
    currentWorkingDirectory = parentDir;
    console.log(`You are currently in ${currentWorkingDirectory}`);
  }
};

const changeDirectory = async (pathToDirectory) => {
  try {
    let newPath;

    if (path.isAbsolute(pathToDirectory)) {
      newPath = pathToDirectory;
    } else {
      newPath = path.join(currentWorkingDirectory, pathToDirectory);
    }

    newPath = path.normalize(newPath);

    const stats = await fs.promises.stat(newPath);
    if (stats.isDirectory()) {
      currentWorkingDirectory = newPath;
      console.log(`You are currently in ${currentWorkingDirectory}`);
    } else {
      console.log("Invalid input");
    }
  } catch (error) {
    console.log("Operation failed");
  }
};

const listDirectory = async () => {
  try {
    const items = await fs.promises.readdir(currentWorkingDirectory);
    const itemsWithStats = [];

    for (const item of items) {
      const itemPath = path.join(currentWorkingDirectory, item);
      try {
        const stats = await fs.promises.stat(itemPath);
        itemsWithStats.push({
          Name: item,
          Type: stats.isDirectory() ? "directory" : "file",
        });
      } catch (error) {
        itemsWithStats.push({
          Name: item,
          Type: "file",
        });
      }
    }

    itemsWithStats.sort((a, b) => {
      if (a.Type === b.Type) {
        return a.Name.localeCompare(b.Name);
      }
      return a.Type === "directory" ? -1 : 1;
    });

    console.log(`\nContents of: ${currentWorkingDirectory}`);
    console.table(itemsWithStats);
  } catch (error) {
    console.log("Operation failed");
  }
};

const getCurrentWorkingDirectory = () => {
  return currentWorkingDirectory;
};

export { nwd, getCurrentWorkingDirectory };
