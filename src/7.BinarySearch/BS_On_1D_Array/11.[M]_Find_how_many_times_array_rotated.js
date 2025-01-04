/* 
Find out how many times the array has been rotated

Problem Statement: Given an integer array arr of size N, sorted in ascending order (with distinct values). Now the array is rotated between 1 to N times which is unknown. Find how many times the array has been rotated. 

Pre-requisites: Find minimum in Rotated Sorted Array,  Search in Rotated Sorted Array II & Binary Search algorithm

Example 1:

Input Format:
 arr = [4,5,6,7,0,1,2,3]
Result:
 4
Explanation:
 The original array should be [0,1,2,3,4,5,6,7]. So, we can notice that the array has been rotated 4 times.

Example 2:

Input Format:
 arr = [3,4,5,1,2]
Result:
 3
Explanation:
 The original array should be [1,2,3,4,5]. So, we can notice that the array has been rotated 3 times.

*/

/* 
 0 1 2 3 4 5 6 7
[4,5,6,7,0,1,2,3]
 l
               h
               
If you take a look at this array, we find minimum element at index 4. Index 4 is same as number of 
rotations. So just find the minimum element and return it's index 

*/

// Find minimum element as per 10.[M]_Minimum_in_Rotated_Sorted_Array.js and then return it's index
// That solves this problem
const findNumberOfRotations = (nums) => {
  let low = 0,
    high = nums.length - 1,
    numOfRotations = 0,
    minimumElement = Infinity;

  /* 
               m
     0 1 2 3 4 5 6 7
    [4,5,6,7,0,1,2,3]
             l
                   h
    */
  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2);
    if (nums[low] <= nums[mid]) {
      //   minimumElement = Math.min(minimumElement, nums[low]);
      //   numOfRotations = low;

      if (nums[low] < minimumElement) {
        minimumElement = nums[low]; // we don't need to find this minElement but just showing it here
        numOfRotations = low;
      }

      low = mid + 1;
    } else {
      //   minimumElement = Math.min(minimumElement, nums[mid]);

      if (nums[mid] < minimumElement) {
        minimumElement = nums[mid];
        numOfRotations = mid;
      }

      high = mid - 1;
    }
  }
  return numOfRotations;
};

console.log(findNumberOfRotations([4, 5, 6, 7, 0, 1, 2, 3]));
console.log(findNumberOfRotations([0, 1, 2, 3, 4, 5, 6, 7]));
