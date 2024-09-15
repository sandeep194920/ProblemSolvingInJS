/*
Example 1:

Input: prices = {1, 1, 0, 1, 1, 1}

Output: 3

Explanation: There are two consecutive 1’s and three consecutive 1’s in the array out of which maximum is 3.

Input: prices = {1, 0, 1, 1, 0, 1} 

Output: 2

Explanation: There are two consecutive 1's in the array. 
*/

/*
Use one variable to store maxCount and second variable for currentCount

[1, 1, 0, 1, 1, 1]

Start traversing and when you find 1, keep adding it to count. When you find other number, compare the count with maxCount
and take the maximum of both which will be the new value in maxCount

*/

const maxConsecutiveOnes = (arr) => {
  let currentCount = 0;
  let maxCount = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 1) {
      currentCount += 1;
      maxCount = Math.max(currentCount, maxCount);
    } else {
      currentCount = 0;
    }
  }
  return maxCount;
};

console.log(maxConsecutiveOnes([1, 1, 0, 1, 1, 1])); // 3
