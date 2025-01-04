/* 
First and Last occurrence in a sorted array

Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.

Example 1:

Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]

Example 2:

Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]

Example 3:

Input: nums = [], target = 0
Output: [-1,-1]

Example 4: nums = [3,4,13,13,13,20,40], target = 13
Output = [2, 4]


*/

/* 

         m
 0   1   2   3   4   5   6          
[3,  4,  5, 13, 13, 20, 40]
         l
         h
FirstOccurrance
fo =  -1 -> 3        

if(a[m] === target){
  fo = a[m]
  h = m - 1
}     
else if(a[m] < target){
  l = m + 1
}          
else {
  h = m - 1
}        

 */

const findFirstOccurrance = (nums, target) => {
  let low = 0,
    fo = -1,
    high = nums.length - 1;

  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2);
    if (nums[mid] === target) {
      fo = mid;
      high = mid - 1;
    } else if (nums[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return fo;
};

const findLastOccurrance = (nums, target) => {
  let low = 0,
    lo = -1,
    high = nums.length - 1;

  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2);
    if (nums[mid] === target) {
      lo = mid;
      low = mid + 1;
    } else if (nums[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return lo;
};

const findFirstAndLastOccurrance = (nums, target) => {
  return [findFirstOccurrance(nums, target), findLastOccurrance(nums, target)];
};

console.log(findFirstAndLastOccurrance([3, 13, 13, 13, 13, 20, 40], 13));

/* Combining both functions above into one. If you take a look, we do 

 if (nums[mid] === target) {
      fo = mid;
      low = mid + 1

for findLastOccurrance

and we do 

if (nums[mid] === target) {
    fo = mid;
    high = mid - 1;

for find FirstOccurrance

*/

const findOccurrances = (nums, target, occuranceType) => {
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

const findAllOccurrances = (nums, target) => {
  return [
    findOccurrances(nums, target, "fo"),
    findOccurrances(nums, target, "lo"),
  ];
};

console.log(
  "Optimized to single function",
  findAllOccurrances([3, 13, 13, 13, 13, 20, 40], 13)
);
