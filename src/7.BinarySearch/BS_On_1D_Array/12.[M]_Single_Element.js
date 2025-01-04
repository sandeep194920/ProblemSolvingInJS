/* 
Search Single Element in a sorted array

Problem Statement: Given an array of N integers. Every number in the array except one appears twice. Find the single number in the array.

Examples

Example 1:
Input Format:
 arr[] = {1,1,2,2,3,3,4,5,5,6,6}
Result:
 4
Explanation:
 Only the number 4 appears once in the array.

Example 2:
Input Format:
 arr[] = {1,1,3,5,5}
Result:
 3
Explanation:
 Only the number 3 appears once in the array.
*/

/*

Example 1 - Unique(4) is present in right half
                m
 0  1  2  3  4  5  6  7  8  9  10                   
[1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6]
 l
                               h


Example 2 - Unique(3) is present in left half

                         m
 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16     
[1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9]
 l  
                                                 h


Thought process:

- Say we are at mid element. If immediate left and right elements of the mid are different then we can return nums[mid] as the answer.
- But the problem is in identifying which half to eliminate. We need to find which half has duplicates and eliminate it. We
  keep only the half that doesn't have duplicates.
- To identify the half having duplicates, it's pretty easy. Take example 1 above where the first half contains duplicates and no unique element. We 
  have to eliminate it. If we look at indices, the elements will be arranged in "even odd even odd" fashion.
  So on the mid, we check if mid is even then the next el of mid is same as mid then we eliminate that half by moving low pointer.
  We also check if mid is odd then the previous element to mid must be same for us to eliminate left part.
- On the other hand (in the else part) the opposite check happens where the elements are expected to be in "odd even odd even" fashion in the right half where unique element is present.

Edge cases

- If we have single element in array that would be the answer so return it. 
- If no elements, return -1.
- If 3 elements 
  arr[0] !== arr[1], then we return arr[0]
  arr[last] !== arr[last - 1], then we return arr[last]



if (index of midEl is odd and nums[midEl] === nums[midEl-1]) or (ind of midEl is even and nums[midEl] === nums+1[midEl]) {

 low = mid + 1
 
}
 else if (index of midEl is odd and nums[midEl] === nums+1[midEl]) or (ind of midEl is even and nums[midEl] === nums-1[midEl]){
  high = mid - 1
 }


*/

const findSingleElement = (nums) => {
  let low = 0,
    high = nums.length - 1;

  //Edge cases

  if (!nums.length) return -1;
  if (nums.length === 1) return nums[0];
  if (nums[0] !== nums[1]) return nums[0];
  if (nums[nums.length - 1] !== nums[nums.length - 2])
    return nums[nums.length - 1];

  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2);

    if (nums[mid] !== nums[mid - 1] && nums[mid] !== nums[mid + 1])
      return nums[mid];
    if (
      (mid % 2 === 1 && nums[mid] === nums[mid - 1]) ||
      (mid % 2 === 0 && nums[mid] === nums[mid + 1])
    ) {
      // eliminate left half as all elements are repeated on left half and no unique element found
      low = mid + 1;
    }
    // eliminate right half as there's no unique element
    else {
      high = mid - 1;
    }
  }
  return -1;
};

console.log(findSingleElement([1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6]));
