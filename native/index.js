let native;

if (process.platform === "linux") {
    native = require("./artifacts/linux-x64-gnu.node");
} else if (process.platform === "win32") {
    native = require("./artifacts/windows-x64-msvc.node");
} else {
    native = require("./artifacts/fallback-64.node");
}

module.exports = { ...native };
