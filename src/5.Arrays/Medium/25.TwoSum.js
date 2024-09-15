/* 
Problem Statement: Given an array of integers arr[] and an integer target.

1st variant: Return YES if there exist two numbers such that their sum is equal to the target. Otherwise, return NO.

2nd variant: Return indices of the two numbers such that their sum is equal to the target. Otherwise, we will return {-1, -1}.

Note: You are not allowed to use the same element twice. Example: If the target is equal to 6 and num[1] = 3, then nums[1] + nums[1] = target is not a solution.
*/

// APPROACH 1 - Brute-force

/* 
  target = 14

  [2,6,5,8,11]

         i
  [2, 5, 6, 8, 11]
            j
*/
console.log("Approach 1 ----- Brute. Time - O(N^2), Space O(1)");
const brute = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        return [i, j];
      }
    }
  }
  return false;
};

console.log(brute([2, 6, 5, 8, 11], 14));
console.log("--------------------");

console.log("Approach 2 Optimal ----- Hashmap - Time O(N) Space O(N)");

// APPROACH 2 - Hashmap

const hashmap = (arr, target) => {
  const hashmap = {};
  for (let i = 0; i < arr.length; i++) {
    if (target - arr[i] in hashmap) {
      return [hashmap[target - arr[i]], i];
    }
    hashmap[arr[i]] = i;
  }
  return false;
};

console.log(hashmap([2, 6, 5, 8, 11], 14));
console.log("--------------------");

// APPROACH 3 - Two pointer - Time O(N) + O(N log N) For sorting, and Space - O(1)

/*

  i       j
  0 1 2 3 4
  2 5 6 8 11
  
- Have the pointers at both the ends. As the array is sorted, that means to say the left most 
  element will be lowest and right most will be the highest.
- Add the elements at the pointers. If sum > target, that means we can ignore right element as 
we want to decrease highest element and move right pointer towards left.
- Similarly, if sum < target, we need to maximize the sum, so we will move left pointer towards right.

 */
console.log(
  "Approach 3 Better ----- Two pointer - Time O(N + N LogN) Space O(1)"
);

const twoPointer = (arr, target) => {
  arr.sort((a, b) => a - b);
  console.log("The array is", arr);
  let left = 0,
    right = arr.length - 1;

  // Time O(N)
  while (left <= right) {
    if (arr[left] + arr[right] === target) {
      return true;
    } else if (arr[left] + arr[right] > target) {
      right--;
    } else {
      left++;
    }
  }
  return false;
};

console.log(twoPointer([2, 6, 5, 8, 11], 14));
console.log("--------------------");

/*
* NOTE : For type 3, two pointer, instead of return true or false, if you want to return
* the index of both numbers, then that won't be an optimal approach anymore. That's because
* when you sort the numbers, the indexes will no longer be sorted. So you might want to 
* consider another data structure like map (or transfer the array elements to map) to preserve the 
* indeces and while returning, you can return the index (map's 2nd element) as well. Like this

Original array = [2, 6, 5, 8, 11]
Can convert to map or array or arrays before  = [[2,0], [6,1], [5,2], [8,3], [11,4]]

Now sort the elements based on first array element

sort((a,b) => b[0] - a[0])

and then if the sum match, then return second elements in array

NOTE: SINCE WE ARE CREATING ARRAY OF ARRAYS, THE SPACE COMPLEXITY INCREASES FROM O(1) TO O(N)
*/

const twoPointerReturnIndices = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = [arr[i], i];
  }

  arr.sort((a, b) => a[0] - b[0]);

  let left = 0,
    right = arr.length - 1;
  while (left <= right) {
    if (arr[left][0] + arr[right][0] === target) {
      return [arr[left][1], arr[right][1]];
    } else if (arr[left][0] + arr[right][0] > target) {
      right--;
    } else {
      left++;
    }
  }
  return twoPointerReturnIndices;
};

console.log(twoPointerReturnIndices([2, 6, 5, 8, 11], 14));
