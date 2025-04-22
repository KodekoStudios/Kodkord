// benchmarks/cpu_mem_heavy.ts
const start = performance.now();

// Alloc memory (for example, 50 MB)
const memoryHog = new Array(50 * 1024 * 1024).fill(0);

let x = 0;
while (performance.now() - start < 500) {
    for (let i = 0; i < 1e6; i++) {
        x += Math.sin(i) * Math.cos(i);
    }
}

