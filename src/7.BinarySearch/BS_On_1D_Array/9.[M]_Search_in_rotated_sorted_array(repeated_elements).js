/* 
Similar to previous problem 8.[M]_Search_in_rotated_sorted_array(unique_elements).js

But the key difference is `The elements are repeated in the given sorted rotated`

* Search Element in Rotated Sorted Array II

?Problem Statement: Given an integer array arr of size N, sorted in ascending order (may contain duplicate values) and a target value k. Now the array is rotated at some pivot point unknown to you. Return True if k is present and otherwise, return False. 

?Pre-requisite: Search Element in Rotated Sorted Array I & Binary Search algorithm

Examples

Example 1:
Input Format:
 arr = [7, 8, 1, 2, 3, 3, 3, 4, 5, 6], k = 3
Result:
 True
Explanation:
 The element 3 is present in the array. So, the answer is True.

Example 2:
Input Format:
 arr = [7, 8, 1, 2, 3, 3, 3, 4, 5, 6], k = 10
Result:
 False
Explanation:
 The element 10 is not present in the array. So, the answer is False.

*/

/* 
target = 4

             m
 0  1  2  3  4  5  6  7  8  9
[7, 8, 1, 2, 3, 3, 3, 4, 4, 6]
 l
                            h
 



                            
*/

const findInSortedRotatedArray = (nums, target) => {
  /* 
       m                            
 0  1  2  3  4                            
[1, 0, 1, 1, 1]                            
    l   
          h
  */
  let low = 0,
    high = nums.length - 1;
  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2);

    // if target is at mid
    if (nums[mid] === target) return true;

    // if arr[low] == arr[high] == arr[mid] then we keep incrementing low and high until a point where
    // this is false. The rest of the algo remains same

    while (nums[low] === nums[high] && nums[high] === nums[mid]) {
      low++;
      high--;
      // note that we don't have to touch mid as it remains in the same position.
    }

    // find sorted half and check if element exists there
    if (nums[low] <= nums[mid]) {
      if (target >= nums[low] && target < nums[mid]) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    } else {
      if (target > nums[mid] && target <= nums[high]) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
  }
  return false;
};

console.log(findInSortedRotatedArray([1, 0, 1, 1, 1], 0));
