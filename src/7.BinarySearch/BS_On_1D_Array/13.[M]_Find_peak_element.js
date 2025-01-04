/* 
Peak element in Array

Example 1:
Input Format: arr[] = {1, 2, 3, 4, 5, 6, 7, 8, 5, 1}
Result: 7
Explanation: In this example, there is only 1 peak that is at index 7.

Example 2:
Input Format: arr[] = {1, 2, 1, 3, 5, 6, 4}
Result: 1
Explanation: In this example, there are 2 peak numbers that are at indices 1 and 5. We can consider any of them.

Example 3:
Input Format: arr[] = {1, 2, 3, 4, 5}
Result: 4
Explanation: In this example, there is only 1 peak that is at the index 4.

Example 4:
Input Format: arr[] = {5, 4, 3, 2, 1}
Result: 0
Explanation: In this example, there is only 1 peak that is at the index 0.

*/

/* 

Example 1

                      P
 0  1  2  3  4  5  6  7  8  9
             m   
[1, 2, 3, 4, 5, 6, 7, 8, 5, 1]
 l  
                            h

Example 2

 0  1  2  3  4  5  6  
                   m
[1, 2, 1, 3, 5, 6, 7]
                   l
                   h 

Both neighbours should be less than curEl. How to identify that in BS. The problem is to eliminate one half each time.
Which half to eliminate?



*/

function findPeakElement(nums) {
  let low = 0,
    high = nums.length - 1;

  //edge cases
  if (!nums.length) return -1;
  if (nums.length === 1) return 0;
  if (nums[0] > nums[1]) return 0;
  if (nums[nums.length - 1] > nums[nums.length - 2]) {
    return nums.length - 1;
  }
  // general cases
  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2);
    if (nums[mid] > nums[mid + 1] && nums[mid] > nums[mid - 1]) return mid;
    if (nums[mid + 1] > nums[mid]) {
      // peak can be mid+1 as well, so we will move left pointer
      low = mid + 1;
    } else {
      high = high - 1;
    }
  }
  return -1;
}

// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 5, 1];
let ans = findPeakElement([1, 6, 5, 4, 3, 2, 1]);
// let ans = findPeakElement([1, 2, 3, 1]);
// let ans = findPeakElement([1, 2, 1, 4, 5, 6, 7, 8]);
console.log("The peak is at index:", ans);
