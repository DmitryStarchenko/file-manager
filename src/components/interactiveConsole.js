import readline from "readline";
import { endMessage } from "./startEndMessage.js";
import { nwd } from "./navigation.js";
import { getCurrentWorkingDirectory } from "./changeDir.js";

const interactiveConsole = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "",
  });

  function updatePrompt() {
    rl.setPrompt(`${getCurrentWorkingDirectory()} : `);
    rl.prompt();
  }

  updatePrompt();

  rl.on("line", (input) => {
    const trimmedInput = input.trim();

    if (trimmedInput === "") {
      rl.prompt();
      return;
    }

    const args = trimmedInput.split(" ");
    const command = args[0].toLowerCase();
    const pathArg = args.slice(1).join(" ");

    nwd(command, pathArg);
    setTimeout(() => {
      updatePrompt();
    }, 100);
  });

  rl.on("close", () => {
    endMessage();
  });
};

export { interactiveConsole };
