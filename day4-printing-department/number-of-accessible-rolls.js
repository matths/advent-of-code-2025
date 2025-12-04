const multilineInput = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [ 0, -1],          [ 0, 1],
  [ 1, -1], [ 1, 0], [ 1, 1]
];

const isRollAtPosition = (grid, x, y) => grid[y] && grid[y][x] === '@';

const getAdjacentPositions = (x, y) => directions.map(([dx, dy]) => [x + dx, y + dy]);

const numberOfAdjacentRolls =
  (grid, x, y) => getAdjacentPositions(x, y).reduce(
    (count, [adjX, adjY]) => count + (isRollAtPosition(grid, adjX, adjY) ? 1 : 0),
    0
  );

const numberOfAccessibleRolls = (input) => {
  const grid = input.split('\n').map(line => line.split(''));
  const num = grid.reduce((total, row, y) =>
    total + row.reduce((rowTotal, col, x) =>
      rowTotal + (col === '@' && numberOfAdjacentRolls(grid, x, y) < 4 ? 1 : 0),
    0),
  0);
  return num;
}

const numberOfIterativeAccessibleRolls = (input) => {
  const grid = input.split('\n').map(line => line.split(''));

  let count = 0;
  let breakOut = false;

  while (!breakOut) {
    const num = grid.reduce((total, row, y) =>
      total + row.reduce((rowTotal, col, x) => {
        if (col === '@' && numberOfAdjacentRolls(grid, x, y) < 4) {
          grid[y][x] = 'x'; // side-effect
          return rowTotal + 1;
        }
        return rowTotal;
      },
      0),
    0);
    count += num;
    if (num === 0) {
      breakOut = true;
    }
  }

  return count;
}

numberOfAccessibleRolls(multilineInput);
numberOfIterativeAccessibleRolls(multilineInput);
