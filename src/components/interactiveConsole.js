import readline from "readline";
import { runEnd } from "./start-end.js";
import { nwd } from "./navigation.js";

const interactiveConsole = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ">>> ",
  });

  rl.prompt();

  rl.on("line", async (input) => {
    const trimmedInput = input.trim();

    if (trimmedInput === "") {
      rl.prompt();
      return;
    }

    const args = trimmedInput.split(" ");
    const command = args[0].toLowerCase();
    const pathArg = args.slice(1).join(" ");

    await nwd(command, pathArg);
    console.log();
    rl.prompt();
  });

  rl.on("close", () => {
    runEnd();
  });
};

export { interactiveConsole };
