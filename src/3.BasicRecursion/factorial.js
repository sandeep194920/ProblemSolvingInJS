/*
Example 1:
Input: X = 5
Output: 120
Explanation: 5! = 5*4*3*2*1

Example 2:
Input: X = 3
Output: 6
Explanation: 3!=3*2*1
*/

// RECURSIVE APPROACH

console.log("-------RECURSIVE APPROACH-------");
const factorialRecursive = (n) => {
  if (n === 1) return 1;
  return n * factorialRecursive(n - 1);
};

const num = 5;
console.log(`Factorial of ${num} is ${factorialRecursive(num)}`);

/*

1! => 1
2! => 2 x 1!     = 2 x 1 = 2
3! => 3 x 2!     = 3 x 2 = 6
4! => 4 x 3!     = 4 x 6 = 24
5! => 5 x 4!     = 5 x 24 = 120
*/

// ITERATIVE APPROACH

console.log("-------ITERATIVE APPROACH-------");

const factorialIterative = (n) => {
  let result = 1;

  //  we can also use for-loop
  while (n > 1) {
    result = result * n;
    n--;
  }
  return result;
};

console.log(`Factorial of ${num} is ${factorialIterative(num)}`);

/*
TRACE
n -> 5, result = 1
   res = 1 x 5 = 5, n = 4
   res = 5 x 4 = 20, n = 3
   res = 20 x 3 = 60, n = 2
   res = 60 x 2 = 120, n = 1 
*/
