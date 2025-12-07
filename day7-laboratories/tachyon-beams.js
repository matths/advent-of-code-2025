const input = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;

function* zip(...iterables) {
  const iterators = iterables.map(it => it[Symbol.iterator]());
  while (true) {
    const results = iterators.map(it => it.next());
    if (results.some(r => r.done)) return;
    yield results.map(r => r.value);
  }
}

const tachyonManifoldBeamSplitCount = (input) => {
  const lines = input.split('\n');
  let processedLines = [];
  return lines.reduce((totalSplitCount, line) => {
    if (!processedLines.length) {
      processedLines.push(line);
      return totalSplitCount;
    };
    let splitCount = 0;
    let previousLine = processedLines[processedLines.length -1];
    let processedLine = '';
    let beamInMind = false;
    for (const [previousChar, currentChar] of zip(previousLine, line)) {
      if (previousChar === 'S') {
        processedLine += '|';
      } else if (beamInMind) {
        processedLine += '|';
        beamInMind = false;
      } else if (currentChar === '^' && previousChar === '|') {
        splitCount += 1;
        processedLine = processedLine.slice(0,-1) + '|' + '^';
        beamInMind = true;
      } else if (previousChar === '|') {
        processedLine += '|';
        beamInMind = false;
      } else {
        processedLine += currentChar;
      }
    }
    processedLines.push(processedLine);
    return totalSplitCount + splitCount;
  }, 0);
};

const quantumTachyonManifoldBeamWaysCount = (input) => {
  const lines = input.split('\n');
  let processedLines = [];

  const allWaysCount = lines.reduce((previousWaysCount, line, lineIndex) => {
    if (!processedLines.length) {
      processedLines.push(line);
      previousWaysCount = {[line.indexOf('S')]: 1};
      return previousWaysCount;
    };
    let waysCount = {};
    let previousLine = processedLines[processedLines.length -1];
    let processedLine = '';
    let beamInMind = false;
    let index = 0;
    for (const [previousChar, currentChar] of zip(previousLine, line)) {
      if (previousChar === 'S') {
        processedLine += '|';
        waysCount[index] = 1;
      } else if (beamInMind) {
        processedLine += '|';
        beamInMind = false;
        waysCount[index] = (previousWaysCount[index-1] ?? 0) + (previousWaysCount[index] ?? 0);
      } else if (currentChar === '^' && previousChar === '|') {
        processedLine = processedLine.slice(0,-1) + '|' + '^';
        waysCount[index] = 0;
        waysCount[index-1] = (waysCount[index-1] ?? 0) + (previousWaysCount[index] ?? 0);
        beamInMind = true;
      } else if (previousChar === '|') {
        processedLine += '|';
        beamInMind = false;
        waysCount[index] = (previousWaysCount[index] ?? 0);
      } else {
        processedLine += currentChar;
      }
      index++;
    }
    if (lineIndex%2===0) {
      previousWaysCount = waysCount;
    }
    processedLines.push(processedLine);
    return previousWaysCount;
  }, {});

  return Object.values(allWaysCount).reduce((a,b) => a + b, 0);
};

tachyonManifoldBeamSplitCount(input);
quantumTachyonManifoldBeamWaysCount(input);
