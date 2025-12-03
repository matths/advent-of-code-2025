const multilineInput = `987654321111111
811111111111119
234234234234278
818181911112111`;

const sumJoltageOfTwo = (input) => {
  const banks = input.split('\n');
  return banks.reduce((sum, bank) => {
    const digits = bank.split('');
    const leftDigit = digits.slice(0,-1).reduce((max, cur) => Math.max(max, Number(cur)), 0);
    const rightDigit = digits.slice(digits.indexOf(''+leftDigit) + 1).reduce((max, cur) => Math.max(max, Number(cur)), 0);
    const joltage = Number(leftDigit + '' + rightDigit);
    return sum + joltage;
  }, 0);
};

const sumJoltageOfTwelve = (input) => {
  const banks = input.split('\n');
  return banks.reduce((sum, bank) => {
    const digits = bank.split('');
    let lastIndex = 0;
    const joltageDigits = Array(12).fill(0).map((_, i) => {
      const haystack = digits.slice(lastIndex, i === 11 ? digits.length : (-11 + i)).map(d => Number(d));
      const max = Math.max(...haystack);
      const index = haystack.indexOf(max);
      lastIndex += index + 1;
      console.log({i, haystack, max, index, lastIndex});
      return max;
    });
    const joltage = Number(joltageDigits.join(''));
    return sum + joltage;
  }, 0);
};

sumJoltageOfTwo(multilineInput);
sumJoltageOfTwelve(multilineInput);
