/* 
Example 1:
Input: N = 5, arr[] = {5,4,3,2,1}
Output: {1,2,3,4,5}
Explanation: Since the order of elements gets reversed the first element will occupy the fifth position, the second element occupies the fourth position and so on.

Example 2:
Input: N=6 arr[] = {10,20,30,40}
Output: {40,30,20,10}
Explanation: Since the order of elements gets reversed the first element will occupy the fifth position, the second element occupies the fourth position and so on.
*/

// APPROACH 1
console.log("******** APPROACH 1 - Recursion ********");

const reverseArrayRecursive1 = (arr) => {
  if (arr.length === 1) return arr;
  const lastElement = arr.pop(); // to remove from the end and store it in a variable
  reverseArrayRecursive1(arr);
  arr.unshift(lastElement); // to add at the beginning
  return arr;
};

console.log(reverseArrayRecursive1([5, 4, 3, 2, 1]));

/* 

STACK TRACE

[5] -> le 4 -> returns [4,5]
[5,4] -> le 3 -> returns [3,4,5]
[5,4,3] -> le 2 -> returns [2,3,4,5]
[5,4,3,2] -> le 1 -> returns [1,2,3,4,5] -> returns this to main caller

*/

/* 
EXPLANATION

We should turn this [5,4,3] into [3, 4, 5]
[5,4,3] can be [5,4] 3 taken out. We can add this later to array
[5,4] can be [5] 4 taken out. We can add this later to array
[5] is the base condition. For this, we can add the previously removed to beginning and so on
   We add this to beginning when the return occurs
*/

/* 
[5,4,3] -> [5,4], 3 removed
[5,4] -> [5], 4 removed
[5] -> return 5 , and then while returning, add removed 4 to beginning


TIME COMP - O(N)
SPACE COMP - O(1)
*/

// APPROACH 2
console.log("******** APPROACH 2 - Iterative - Using extra space ********");

/*
Main array   - [ 5, 4, 3, 2, 1]
Result array - [last element in main array to first position here, and so on ]

TIME COMP - O(n) as we do one pass of array
SPACE COMP - O(n) as we use extra space for storing and passing result
*/

const reverseArrayExtraSpace = (arr) => {
  const resultArr = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    resultArr.push(arr[i]);
  }
  return resultArr;
};

console.log(reverseArrayExtraSpace([5, 4, 3, 2, 1]));

// APPROACH 3
console.log("******** APPROACH 3 - Iterative - Using 2 pointer swap ********");

const reverseArray2Pointer = (arr) => {
  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    let temp = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

console.log(reverseArray2Pointer([5, 4, 3, 2, 1]));

/*
main array - [5 , 4 , 3 , 2 , 1]
first pass - [1               5]
second pass- [1   2       4   5]
third pass - [1   2   3   4   5]

Take 2 pointers, at start and end. At each iteration, swap them. You can run the loop for half times of n. 
If length is odd, then floor it. Running on first two elements will solve it if array is length of 5.

TIME COMP - O(N/2) which is also equal to O(N)
SPACE COMP - O(1)
*/

// APPROACH 4
console.log(
  "******** APPROACH 4 - Recursive - Using 3rd iterative approach swap ********"
);

/*
main array - [5 , 4 , 3 , 2 , 1]
first pass - [1               5]
second pass- [1   2       4   5]
third pass - [1   2   3   4   5]

Take 2 pointers, at start and end. At each iteration, swap them. You can run the loop for half times of n. 
If length is odd, then floor it. Running on first two elements will solve it if array is length of 5.

FROM THIS APPROACH lets apply recursion

FIRST TIME
5 4 3 2 1
start 5, end 1. Let's store this and then unshift first and pop last element

last = 1
first = 5

SECOND TIME
4 3 2
start 4, end 2. Let's store this 

last = 2
first = 4

THIRD TIME
3
This is the last one. So we will return this. 
Here, if the array had 6 elements, then for the THIRD TIME, the array will be empty. So the base condition 
can be either one element or 0 elements

TIME COMP - O(N/2) which is equal to O(N)
SPACE COMP - O(1)
*/

const reverseRecursive2Pointer = (arr) => {
  if (arr.length === 0 || arr.length === 1) return arr;

  let lastElement = arr.pop();
  let firstElement = arr.shift();
  reverseRecursive2Pointer(arr);
  arr.unshift(lastElement); // adding last element at first
  arr.push(firstElement); // adding first element at last
  return arr;
};

console.log(reverseRecursive2Pointer([5, 4, 3, 2, 1]));

/* 

3 -> return 3    ====   to the previous step

4 3 2
l -> 2, f -> 4   ====  2 3 4

5 4 3 2 1
l -> 5, f -> 1   ====    1 2 3 4 5
 
*/

let arr = Array.from({ length: 5 }, (_, index) => index);

console.log(arr);
