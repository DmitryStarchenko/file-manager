let userName;

const runStart = () => {
  const ARGS = process.argv.slice(2);
  userName = ARGS[0].split("=");

  console.log(`Welcome to the File Manager, ${userName[1]}!`);
};

const runEnd = () => {
  const gracefulShutdown = (signal) => {
    console.log(`\nThank you for using File Manager, ${userName[1]}, goodbye!`);
    process.exit(0);
  };

  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (data) => {
    const exit = data.trim();
    if (exit === ".exit") gracefulShutdown();
  });

  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
};

export { runStart, runEnd };
