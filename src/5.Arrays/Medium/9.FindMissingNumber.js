/*
Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.

Example 1:

Input: nums = [3,0,1]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.

Example 2:

Input: nums = [0,1]
Output: 2
Explanation: n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.

Example 3:

Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
Explanation: n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums.
*/

/*
Brute force approach

The numbers MUST be starting from 0 and go up to something. For example, in [3,0,1] we know that the length of array is 3.
There is a missing number here, and this is the way we can find it. We loop from 0 
(because we know 0 is the first element may be not at first index in the array) till end. For every i, we check if i is in 
array. If not we return that number

*/

console.log("APPROACH 1 - Brute-force approach - Time O(N^2)");

const bruteForceLinearSearch = (arr) => {
  const arrayLen = arr.length;

  const usingIncludesMethod = () => {
    for (let i = 0; i < arrayLen; i++) {
      if (!arr.includes(i)) {
        // includes is O(N) as it checks if this number exists in array by traversing array every time. Same as below implmentation
        return i;
      }
    }
    return "Nothing is missing";
  };

  //   [3, 0, 1]

  const notUsingIncludesMethod = () => {
    for (let i = 0; i < arrayLen; i++) {
      let found = false;
      for (let j = 0; j < arrayLen; j++) {
        if (i === arr[j]) {
          found = true;
        }
      }
      if (!found) return i;
    }
  };

  //   return usingIncludesMethod();
  return notUsingIncludesMethod();
};

const missingNum = bruteForceLinearSearch([0, 1, 3]);
console.log("Missing number using brute-force - ", missingNum);
console.log("-------------------------------------------------");

console.log(
  "APPROACH 2 - Hashmap approach improving Bruteforce multiple traversals - Time O(N), Space O(N)"
);

/*
You see we used the inner loop where, for every element we traversed through entire array. So the 
whole array is traversed again and again. We can optimize it using hashmap so we dont have
to traverse entire array multiple times. We do it once and then we can lookup everytime.


[0, 1, 3]

store this in hashmap
{
0: 1,
1: 1,
3: 1
}

Now, do the same as you did in Bruteforce where you run the loop from 0, but the inner loop 
will be the lookup of hashmap this time

for(every i starting from 0){
 if(!hashmap[i]){
  return i
 }
}

Time complexity - 
 - Hashmap creation from array - O(N) for N elements in array
 - for loop to find if element is in hashmap - O(N)

 *So it is O(N+N) = O(2N) which is same as O(N)

Space complexity - O(N) for hashmap
 
*/

const usingHashMap = (arr) => {
  const hashmap = {};
  for (let ch of arr) {
    hashmap[ch] = 1; // we actually don't care about the value here
  }

  // 0 is the starting element in array, so i starts from 0
  for (let i = 0; i < arr.length; i++) {
    if (!hashmap[i]) {
      // O(1) time for lookup
      return i;
    }
  }
  return "Nothing is missing";
};

const missingNum2 = usingHashMap([0, 1, 3]);
console.log("Missing number using hashmap- ", missingNum2);
console.log("-------------------------------------------------");

console.log(
  "APPROACH 3 - Optimal solution - Summation - Time O(N), Space O(1)"
);

/*
This is pretty interesting solution
Say we have [0,1,2,3,5] -> 4 is missing here

the sum of first N natural numbers is N x (N+1) / 2. 
*This gives sum of all numbers including missing number

In this case, we take N as arr.length. So it is, 5 x (5+1)/2 = 15. 

Now we need to find missing number. We will loop through the array, add up every number and then see how much it comes.

0+1+2+3+5 = 11

So the missing number in 15 is 4 because 4 + 11 gives us 15.

Time comp - O(N) to loop and find the sum. 
Space comp - O(1) 
*/

const summation = (arr) => {
  const nElements = arr.length;

  //* this gives sum of all numbers including missing number
  const actualSum = (nElements * (nElements + 1)) / 2;

  // To see which number is missing, let's sum all array elements
  let sumOfAllArrayElements = 0;

  for (let num of arr) {
    sumOfAllArrayElements += num;
  }

  // gives missing number
  return actualSum - sumOfAllArrayElements;
};

console.log("Missing number through summation - ", summation([0, 3, 1]));

console.log("-------------------------------------------------");

console.log("APPROACH 3 - Optimal solution - XOR");

/*
REMEMBER XOR ^ (Please remember below 2 points about xor)
 
Any number ^ With itself -----> 0
Any number ^ With 0 -----> The number itself

0 ^ 0 = 0
5 ^ 5 = 0

7 ^ 7 ^ 7 ^ 7 = 0
-----   ----- 
  0   ^   0


7 ^ 0 = 7
9 ^ 0 = 9

Let's not implement this now, and come back to this later when we do Bit manipulation
*/
