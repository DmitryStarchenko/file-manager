import fs from "fs";

const deleteFile = (filePath) => {
  if (filePath === "") {
    console.log("❌ You must enter the file path ❌");
    return;
  }
  fs.unlink(filePath, (error) => {
    if (error) {
      console.log("❌ File deletion error ❌");
    } else {
      console.log("🆗 File deleted");
    }
  });
};

export { deleteFile };
