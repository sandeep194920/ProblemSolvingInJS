/* 
Minimum in Rotated Sorted Array

Problem Statement: Given an integer array arr of size N, sorted in ascending order (with distinct values). Now the array is rotated between 1 to N times which is unknown. Find the minimum element in the array. 

Pre-requisites: Search in Rotated Sorted Array I,  Search in Rotated Sorted Array II & Binary Search algorithm

Examples
Example 1:
Input Format:
 arr = [4,5,6,7,0,1,2,3]
Result:
 0
Explanation:
 Here, the element 0 is the minimum element in the array.

Example 2:
Input Format:
 arr = [3,4,5,1,2]
Result:
 1
Explanation:
 Here, the element 1 is the minimum element in the array.

*/

/* 

             m
 0  1  2  3  4  5  6  7
[4, 5, 6, 7, 0, 1, 2, 3]
             l

             h   

       m 
 0  1  2  3  4 
[3, 4, 5, 1, 2]
 l
             h

  m
  0   1   2   3
[11, 13, 15, 17]             
 l
 h  


 Similar to Problem 8, but we return element where l, h and mid meets.


               m 
     [11, 12, 13, 14, 15]                 
      l
                       h


               m 
     [15, 14, 13, 12, 11]                 
      l
                       h


*/

const findMinElement = (nums) => {
  /* 

                   m    
 0  1  2  3  4  5  6  7  8  9              
[4, 5, 6, 7, 8, 9, 0, 1, 2, 3]
                   l 
                   h

           m
     0 1 2 3 4 5 6 7
    [4,5,6,7,0,1,2,3]
     l
                   h               
    */
  let low = 0,
    high = nums.length - 1,
    lowest = Infinity; // 4 -> 1
  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2);

    // see which half is sorted, and first get a minimum from the sorted half, and then eliminate that half
    if (nums[low] <= nums[mid]) {
      // left half

      lowest = Math.min(lowest, nums[low]); // got the first lowest. Now we can eliminate this half
      low = mid + 1;
    } else {
      // If right half is sorted, then mid element will most likely be smaller, so consider that
      lowest = Math.min(lowest, nums[mid]);
      high = mid - 1;
    }
  }
  return lowest;
};

// console.log(findMinElement([3, 4, 5, 1, 2]));
// console.log(findMinElement([11, 12, 13, 14, 15]));
// console.log(findMinElement([15, 14, 13, 12, 11]));
console.log(findMinElement([4, 5, 6, 7, 8, 9, 0, 1, 2, 3]));
