import { spawn, spawnSync } from "bun";
import { terminal } from "terminal-kit";

// Read CPU time (user + sys) in microseconds from /proc
async function getCpuTimeFromProc(pid: number): Promise<number> {
    try {
        const stat = Bun.file(`/proc/${pid}/stat`);
        const content = await stat.text();
        const parts = content.split(" ");
        const utime = Number(parts[13]); // user time in ticks
        const stime = Number(parts[14]); // system time in ticks
        const totalTicks = utime + stime;

        const ticksPerSecond = 100; // Common default on Linux
        const cpuSeconds = totalTicks / ticksPerSecond;
        return cpuSeconds * 1_000_000; // μs
    } catch {
        return 0;
    }
}

async function benchFile(file: string) {
    terminal("^+^[bg:green] %s \n", file);

    return await new Promise<void>((resolve) => {
        terminal.getCursorLocation(async (_, x = 0, y = 0) => {
            const child = spawn(["bun", await Bun.resolve(file, __dirname)], {
                stdout: "inherit",
                stderr: "inherit",
            });

            const data: number[][] = [];

            const interval = setInterval(() => {
                const out = spawnSync(["ps", "-p", child.pid.toString(), "-o", "%cpu,rss,%mem"], {
                    stdout: "pipe",
                });

                const matches = [...out.stdout.toString().matchAll(/\d+(\.\d+)?/g)];
                if (matches.length >= 3) {
                    data.push(matches.map(r => Number(r[0])));
                }
            }, 50);

            // Watch for process exit + grab CPU stat *before* it's gone
            const waitForExit = new Promise<void>((resolve) => {
                child.exited.then(() => resolve());
            });

            let cpuMicros = 0;
            const poll = setInterval(async () => {
                // Try capturing CPU time just before it exits
                cpuMicros = await getCpuTimeFromProc(child.pid);
            }, 10);

            await waitForExit;
            clearInterval(interval);
            clearInterval(poll);

            if (data.length === 0) {
                terminal.red("No performance data collected.\n");
                return;
            }

            const transpose = (array: number[][]) => array[0]!.map((_, i) => array.map(row => row[i]!));
            const [cpuList, rssList, memList] = transpose(data);

            const stats = (arr: number[]) => ({
                avg: (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2),
                min: Math.min(...arr).toFixed(2),
                max: Math.max(...arr).toFixed(2),
            });

            const cpu = stats(cpuList!);
            const rss = stats(rssList!.map(v => v / 1024));
            const mem = stats(memList!);

            terminal.moveTo(x, y).table([
                [
                    "Metric",
                    "Avg",
                    "Min",
                    "Max",
                ],
                [
                    "RSS",
                    `${rss.avg} MiB`,
                    `${rss.min} MiB`,
                    `${rss.max} MiB`,
                ],
                [
                    "TIME",
                    `${cpuMicros.toFixed(0)} μs`,
                    "-",
                    "-",
                ],
                [
                    "MEM",
                    `${mem.avg} %`,
                    `${mem.min} %`,
                    `${mem.max} %`,
                ],
                [
                    "CPU",
                    `${cpu.avg} %`,
                    `${cpu.min} %`,
                    `${cpu.max} %`,
                ]
            ], {
                hasBorder: false,
                contentHasMarkup: true,
                firstRowTextAttr: { bold: true, color: "cyan" },
                textAttr: { dim: true },
                fit: true,
                width: 50
            });
            terminal('\n');

            resolve();
        });
    });
}

await benchFile("./kodkord.ts");
await benchFile("./discord.ts");
await benchFile("./oceanic.ts");
