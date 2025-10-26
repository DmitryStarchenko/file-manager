import readline from "readline";
import { endMessage } from "./startEndMessage.js";
import { nwd } from "./navigation.js";

const interactiveConsole = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "",
  });

  rl.prompt();

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
    rl.prompt();
  });

  rl.on("close", () => {
    endMessage();
  });
};

export { interactiveConsole };
