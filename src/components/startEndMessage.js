import { getCurrentWorkingDirectory } from "./changeDir.js";

let userName;

const startMessage = () => {
  const ARGS = process.argv.slice(2);
  userName = ARGS.length === 0 ? 'Anonym' : ARGS[0].split("=")[1];

  console.log(`🌟 Welcome to the File Manager, ${userName}! 🌟`);
  console.log(`📚 You are currently in ${getCurrentWorkingDirectory()}\n`);
};

const endMessage = () => {
  console.log(`\nThank you for using File Manager, ${userName}, goodbye! 👋`);
  process.exit(0);
};

export { startMessage, endMessage };
