import { getCurrentWorkingDirectory } from "./changeDir.js";

const getPath = (path) => {
  if (
    path.startsWith("C:\\") ||
    path.startsWith("/U") ||
    path.startsWith("/h")
  ) {
    return path;
  } else if (path.startsWith("./")) {
    return `${getCurrentWorkingDirectory()}\\${path.slice("2")}`;
  } else if (path === "") {
    console.log("❌ You must enter the path ❌");
    return;
  } else {
    console.error("❌ You entered an incorrect path ❌");
    return;
  }
};

export { getPath };
