/*
Example 1:

Input: array = [2,3,6,7], target = 7

Output: [[2,2,3],[7]]

Explanation: 2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
             7 is a candidate, and 7 = 7.
             These are the only two combinations.


Example 2:

Input: array = [2], target = 1

Output: []

Explaination: No combination is possible.
*/

const result = []; // for final result
const arr = [2, 3, 6, 7];
const findCombinations = (index, target, combinations) => {
  // BASE CASE
  if (index === arr.length) {
    if (target === 0) {
      result.push([...combinations]);
    }
    return;
  }

  // RECURSIVE CASE
  // Only the left side must be checked for this condition so wrapping it
  if (target >= arr[index]) {
    combinations.push(arr[index]);
    findCombinations(index, target - arr[index], combinations);
    combinations.pop();
  }

  findCombinations(index + 1, target, combinations);
};

findCombinations(0, 7, []);

console.log(result);
