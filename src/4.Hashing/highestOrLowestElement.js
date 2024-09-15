/*
Example 1:
Input: array[] = {10,5,10,15,10,5};
Output: 10 15
Explanation: The frequency of 10 is 3, i.e. the highest and the frequency of 15 is 1 i.e. the lowest.

Example 2:

Input: array[] = {2,2,3,4,4,2};
Output: 2 3
Explanation: The frequency of 2 is 3, i.e. the highest and the frequency of 3 is 1 i.e. the lowest.
*/

const highestLowest = (arr) => {
  let highest = 0;
  let lowest = arr.length; // this is going to be highest possible
  const frequencies = {};

  // just initialize with first element
  let lowFreqEl = arr[0];
  let highFreqEl = arr[0];

  for (let ch of arr) {
    if (frequencies[ch]) {
      frequencies[ch] += 1;
    } else {
      frequencies[ch] = 1;
    }
  }

  for (let key in frequencies) {
    const val = frequencies[key];
    if (val > highest) {
      highFreqEl = +key;
      highest = val;
    }

    if (val < lowest) {
      lowFreqEl = +key;
      lowest = val;
    }
  }
  return [lowFreqEl, highFreqEl];
};

console.log(highestLowest([10, 5, 10, 15, 10, 5]));
