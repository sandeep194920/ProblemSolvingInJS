/* 
Count Occurrences in Sorted Array


71

0
Problem Statement: You are given a sorted array containing N integers and a number X, you have to find the occurrences of X in the given array.

Examples
Example 1:
Input:
 N = 7,  X = 3 , array[] = {2, 2 , 3 , 3 , 3 , 3 , 4}
Output
: 4
Explanation:
 3 is occurring 4 times in 
the given array so it is our answer.

Example 2:
Input:
 N = 8,  X = 2 , array[] = {1, 1, 2, 2, 2, 2, 2, 3}
Output
: 5
Explanation:
 2 is occurring 5 times in the given array so it is our answer.

*/

/*
This is the extension of last problem 6.[Medium]First_And_Last_occurrance.js.
 
 0  1  2  3  4  5 
[1, 4, 4, 4, 4, 5]

Say you have this array. From problem 6, you know how to find first and last occurrance. Find the 
index of first and last occurrance and then all you have to do is, lastIndex - firstIndex + 1 to 
get number of occurrances.


4 starts at index 1, and ends at index 4. So the number of elements are 4 - 1 + 1 = 4

*/

const findNumberOfElements = (nums, target, occuranceType) => {
  let low = 0,
    fo = -1,
    lo = -1,
    high = nums.length - 1;

  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2);
    if (nums[mid] === target) {
      if (occuranceType === "fo") {
        fo = mid;
        high = mid - 1;
      } else {
        lo = mid;
        low = mid + 1;
      }
    } else if (nums[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return occuranceType === "fo" ? fo : lo;
};

const numberOfElements = (nums, target) => {
  return (
    findNumberOfElements(nums, target, "lo") -
    findNumberOfElements(nums, target, "fo") +
    1
  );
};

console.log(numberOfElements([3, 13, 13, 13, 13, 20, 40], 13));
