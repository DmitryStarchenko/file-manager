import fs from "fs";

const readFile = (filePath) => {
  if (filePath === "") {
    console.log("❌ You must enter the file path ❌");
    return;
  }
  const stream = fs.createReadStream(filePath);
  stream.on("error", () => {
    console.log("❌ Error reading file ❌");
  });
  stream.pipe(process.stdout);
  stream.on("end", () => {
    console.log("\n");
  });
};

export { readFile };
