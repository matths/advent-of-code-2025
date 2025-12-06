const input = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

const add = (...args) => args.reduce((a, b) => a + b, 0);
const multiply = (...args) => args.reduce((a, b) => a * b, 1);

function* numberStream(line) {
  let num = "";
  for (const chr of line) {
    if (/\d/.test(chr)) {
      num += chr;
    } else if (num) {
      yield Number(num);
      num = "";
    }
  }
  if (num) yield Number(num);
}

function* operatorStream(line) {
  for (const chr of line) {
    if (chr === '*' || chr === '+') {
      yield chr === '*' ? multiply : add;
    }
  }
}

function* tasksStream(input) {
  const lines = input.trim().split('\n');

  const numberLines = lines.slice(0, -1);
  const numberStreams = numberLines.map(numberLine => numberStream(numberLine));

  const operatorLine = lines[lines.length - 1];
  const operators = operatorStream(operatorLine);

  while (true) {
    const numbers = numberStreams.map(n => n.next().value);
    if (numbers[0] === undefined) break;

    const operator = operators.next().value;
    yield operator(...numbers);
  }
}

const part1 = (input) => {
  let total = 0;
  for (const taskResult of tasksStream(input)) {
    total += taskResult;
  }
  return total;
}

const reverseString = (str) => {
  let reversed = "";
  for (const ch of str) {
    reversed = ch + reversed;
  }
  return reversed;
}

function* zip(...iterables) {
  const iterators = iterables.map(it => it[Symbol.iterator]());
  while (true) {
    const results = iterators.map(it => it.next());
    if (results.some(r => r.done)) return;
    yield results.map(r => r.value);
  }
}

const calculate = (numbers, operatorStr) => {
  const operator = operatorStr === '+' ? add : multiply;
  return operator(...numbers);
}

function* tasksStreamPart2(input) {
  const lines = input.split('\n').map(line => reverseString(line));
  let numbers = [];
  let operator = '';
  for (const chars of zip(...lines)) {
    const numStr = chars.slice(0, -1).join('');
    const op = chars[chars.length - 1];
    if (op === ' ' && operator !== '') {
      yield calculate(numbers, operator);
      numbers = [];
      operator = '';
    } else {
      numbers.push(Number(numStr.trim()));
      operator = (operator + op).trim();
    }
  }
  yield calculate(numbers, operator);
}

const part2 = (input) => {
  let total = 0;
  for (const taskResult of tasksStreamPart2(input)) {
    total += taskResult;
  }
  return total;
};

part1(input);
part2(input);
