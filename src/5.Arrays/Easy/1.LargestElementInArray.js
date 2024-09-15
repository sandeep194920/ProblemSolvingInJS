/*
Example 1:
Input:
 arr[] = {2,5,1,3,0};
Output:
 5
Explanation:
 5 is the largest element in the array. 

Example2:
Input:
 arr[] = {8,10,5,7,9};
Output:
 10
Explanation:
 10 is the largest element in the array. 
*/

// APPROACH 1 - SORT IN DESCENDING and find the first element
console.log("Approach 1 - Sort the array - Time O(NLogN) Space O(1)");
const findBySortApproach = (arr) => {
  const sortedArray = arr.sort((a, b) => b - a);
  return sortedArray[0];
};

console.log(findBySortApproach([2, 5, 1, 3, 0]));

// APPROACH 2 - Iterative approach
console.log("Approach 2 - Find by iterative approach - Time O(N) Space O(1)");

const findByIterativeApproach = (arr) => {
  let max = -Infinity;
  for (let ch of arr) {
    if (ch > max) {
      max = ch;
    }
  }
  return max;
};

console.log(findByIterativeApproach([2, 5, 1, 3, 0]));
