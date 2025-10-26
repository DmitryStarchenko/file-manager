import { getCurrentWorkingDirectory } from "./changeDir.js";

let userName;

const startMessage = () => {
  const ARGS = process.argv.slice(2);
  userName = ARGS[0].split("=");

  console.log(`Welcome to the File Manager, ${userName[1]}!`);
  console.log(`You are currently in ${getCurrentWorkingDirectory()}\n`);
};

const endMessage = () => {
  console.log(`\nThank you for using File Manager, ${userName[1]}, goodbye!`);
  process.exit(0);
};

export { startMessage, endMessage };
