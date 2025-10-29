import fs from "fs";
import crypto from "crypto";

const hashFile = async (filePath) => {
  if (filePath === "") {
    console.log("❌ You must enter the file path ❌");
    return;
  }
  const fileStream = fs.createReadStream(filePath);
  const hash = crypto.createHash("sha256");

  fileStream.on("data", (data) => {
    hash.update(data);
  });

  fileStream.on("end", () => {
    const fileHash = hash.digest("hex");
    console.log(`File hash: ${fileHash}`);
  });
};

export { hashFile };
