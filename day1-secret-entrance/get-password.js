const multilineInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
…`;

const getPassword = (input) => {
    let current = 50;
    return input
    .trim()
    .split("\n")
    .map(line => {
        const dir = line[0];
        const val = parseInt(line.slice(1), 10);
        current += (dir === 'R' ? +1 : -1) * val;
        current = ((current % 100) + 100) % 100;
        return current;
    })
    .filter(item => item === 0)
    .length;
};

const getPassword_0x434C49434B = (input) => {
    let current = 50;
    let hits = 0;
    input.trim().split("\n").forEach(line => {
        const dir = line[0];
        const val = parseInt(line.slice(1), 10);
        let start = current;
        if (dir === "R") {
            let first = (100 - start) % 100;
            if (first < val) {
                hits += 1 + Math.floor((val - 1 - first) / 100);
            }
            current = (start + val) % 100;
        } else {
            let first = start % 100;
            if (first < val) {
                hits += 1 + Math.floor((val - 1 - first) / 100);
            }
            current = ((start - val) % 100 + 100) % 100;
        }
    });
    return hits;
};
