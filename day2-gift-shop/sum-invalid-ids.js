const input = '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124';

const findInvalidIdsInRangePart1 = (start, end) => {
    const invalidIds = [];
    for (let id = start; id <= end; id++) {
        const idStr = id.toString();
        const len = idStr.length;
        if (len % 2 === 0) {
            const half = len / 2;
            const firstHalf = idStr.slice(0, half);
            const secondHalf = idStr.slice(half);
            if (firstHalf === secondHalf) {
                invalidIds.push(id);
            }
        }
    }
    return invalidIds;
};

const findInvalidIdsInRangePart2 = (start, end) => {
    const invalidIds = [];
    for (let id = start; id <= end; id++) {
        const idStr = id.toString();
        const len = idStr.length;
        for (let subLen = 1; subLen <= Math.floor(len / 2); subLen++) {
            if (len % subLen === 0) {
                const subStr = idStr.slice(0, subLen);
                const repeatedStr = subStr.repeat(len / subLen);
                if (repeatedStr === idStr) {
                    invalidIds.push(id);
                    break;
                }
            }
        }
    }
    return invalidIds;
};

const sumInvalidIds = (input, findInvalid) => {
    return input.split(',').reduce((sum, range) => {
        const [start, end] = range.split('-').map(Number);
        return sum + findInvalid(start, end).reduce((partialSum, id) => partialSum + id, 0);
    }, 0);
};

sumInvalidIds(input, findInvalidIdsInRangePart1);
sumInvalidIds(input, findInvalidIdsInRangePart2);
