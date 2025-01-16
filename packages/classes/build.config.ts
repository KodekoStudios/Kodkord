import { resolve } from "node:path";
import { createBuildConfig } from "../../builder";

// biome-ignore lint/style/noDefaultExport: <explanation>
export default createBuildConfig(
    ["./src/index.ts"],
    [{
        find: "@entity",
        replacement: resolve(__dirname, "./src/core/entity")
    }]
);