/*
Example 1:
Input Format:
 arr[] = {2,2,1}
Result:
 1
Explanation:
 In this array, only the element 1 appear once and so it is the answer.

Example 2:
Input Format:
 arr[] = {4,1,2,1,2}
Result:
 4
Explanation:
 In this array, only element 4 appear once and the other elements appear twice. So, 4 is the answer.
*/

const findNumberAppearingOnce = (arr) => {
  const frequencies = {};

  for (let i = 0; i < arr.length; i++) {
    frequencies[arr[i]] = (frequencies[arr[i]] || 0) + 1;
  }

  for (let key in frequencies) {
    if (frequencies[key] === 1) {
      return key;
    }
  }
};

const result = findNumberAppearingOnce([1, 1, 4, 2, 2]);
console.log(result);
