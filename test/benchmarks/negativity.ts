import { bench, run, summary } from 'mitata';

const VALUE = 43 - 112; // Random value
summary(() => {
    bench("Ternary", () => {
        return VALUE >= 0 ? VALUE : -1;
    });

    bench("Max", () => {
        return Math.max(-1, VALUE);
    });
});

await run();