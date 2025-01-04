/* 
Search Element in a Rotated Sorted Array

Problem Statement: Given an integer array arr of size N, sorted in ascending order (with distinct values) and a target value k. Now the array is rotated at some pivot point unknown to you. Find the index at which k is present and if k is not present return -1.

Example 1:

Input Format: arr = [4,5,6,7,0,1,2,3], k = 0
Result: 4
Explanation: Here, the target is 0. We can see that 0 is present in the given rotated sorted array, nums. Thus, we get output as 4, which is the index at which 0 is present in the array.

Example 2:

Input Format: arr = [4,5,6,7,0,1,2], k = 3
Result: -1
Explanation: Here, the target is 3. Since 3 is not present in the given rotated sorted array. Thus, we get the output as -1.

*/

/* 

target1 = 0

                   m    
 0  1  2  3  4  5  6  7  8  9              
[4, 5, 6, 7, 8, 9, 0, 1, 2, 3]
                   l 
                   h
 

while (low <= high){
    
    mid = low + MF ((high - low)/2)    // 8 -> 7
  
    if(ar[mid] === target) return mid

    ///Identify the sorted part

    if(arr[low] <= arr[mid]){ -> Sorted half -> Unsorted half
        
        if(target in between low and mid)   -> if(target >= a[low] and target < a[mid]){
            h = mid - 1 
        }

        else if(target in between mid and high){    -> if(target > a[mid] and target <= a[high])
            l = mid + 1
        }

    }
    else if(arr[high] => arr[mid])   (high el is greater or equal to mid el){
    
        if(target in between mid and high){ (target > mid and target is <= high)
            l = mid + 1
        }else{
            h = mid - 1
        }

    }
}


                            
        -
      - - 
   -  - -
-  -  - -
-  -  - -      -
-  -  - -    - -
-  -  - -  - - - 
  

          m
[4, 5, 6, 7, 0, 1, 2]
 l
                   h



        -
      - - 
   -  - -
-  -  - -
-  -  - -      -
-  -  - -    - -
-  -  - -  - - - 

*/

const findInSortedRotatedArray = (nums, target) => {
  /* 
target1 = 0

                      m    
 0  1  2  3  4  5  6  7  8  9              
[4, 5, 6, 7, 8, 9, 0, 1, 2, 3]
                l 
                            h
*/
  let low = 0,
    high = nums.length - 1;
  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2);

    // if target is at mid
    if (nums[mid] === target) return mid;

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
  return -1;
};

console.log(findInSortedRotatedArray([4, 5, 6, 7, 0, 1, 2, 3], 3));
