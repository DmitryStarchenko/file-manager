import fs from "fs";
// нужно ввести абсолютный путь
const readFile = async (filePath) => {
  const stream = fs.createReadStream(filePath);
  stream.pipe(process.stdout);
  stream.on("end", () => {
    console.log("\n");
  });
};

export { readFile };
