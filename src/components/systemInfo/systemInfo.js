import os from "os";

const systemInfo = (method) => {
  if (method.startsWith("--")) {
    switch (method) {
      case "--EOL":
        console.log(`🏁 ${JSON.stringify(os.EOL)}`);
        break;
      case "--cpus":
        console.log(`🏁 Total number of processors: ${os.cpus().length}`);
        for (let i = 0; i < os.cpus().length; i++) {
          console.log(`🏁 CPU ${i + 1}`);
          console.log(`🏁 Model: ${os.cpus()[i].model}`);
          console.log(`🏁 Speed: ${os.cpus()[i].speed / 1000} GHz`);
        }
        break;
      case "--homedir":
        console.log(`🏁 ${os.homedir()}`);
        break;
      case "--username":
        console.log(`🏁 ${os.userInfo().username}`);
        break;
      case "--architecture":
        console.log(`🏁 ${os.arch()}`);
        break;
      default:
        console.log(`❌ Invalid method entered ❌`);
    }
  } else {
    console.log('❌ Start the method with "--" ❌');
  }
};

export { systemInfo };
