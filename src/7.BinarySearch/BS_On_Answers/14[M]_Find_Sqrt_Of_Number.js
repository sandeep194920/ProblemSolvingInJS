/* 
Finding Sqrt of a number using Binary Search

Problem Statement: You are given a positive integer n. Your task is to find and return its square root. 
If ‘n’ is not a perfect square, then return the floor value of 'sqrt(n)'.

Note: The question explicitly states that if the given number, n, is not a perfect square, 
our objective is to find the maximum number, x, such that x squared is 
less than or equal to n (x*x <= n). In other words, we need to determine the floor value of the square root of n.

Example 1:
Input Format:
 n = 36
Result:
 6
Explanation:
 6 is the square root of 36.

Example 2:
Input Format:
 n = 28
Result:
 5
Explanation:
 Square root of 28 is approximately 5.292. So, the floor value will be 5.
 
*/

/* 

We check from 0 to that number (which is increasing order) and for each number we find the square of that to 
see if we get the result. This is linear search. Same can be applied for binary search.

Say number is 64. It's sqrt is 8. So we start from 0 until 64 and keep reducing one half always.

*/

// 25 => 5
/*
 64

 32

*/

const findSqrt = (num) => {
  let low = 0,
    high = num,
    sqrt = 0;
  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2);
    if (mid * mid <= num) {
      sqrt = mid; // could be an answer
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return sqrt;
};

console.log("For square root of number 64 is,", findSqrt(64));
console.log("For square root of number 256 is,", findSqrt(256));
console.log("For square root of number 255 is,", findSqrt(255));
