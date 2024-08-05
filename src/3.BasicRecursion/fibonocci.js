/* 
Example 1:
Input: N = 5

Output: 0 1 1 2 3 5
Explanation: 0 1 1 2 3 5 is the fibonacci series up to 5th term.(0 based indexing)

-----

Example 2:
Input: 6

Output: 0 1 1 2 3 5 8
Explanation: 0 1 1 2 3 5 8 is the fibonacci series upto 6th term.(o based indexing)
*/

/*
Remember, Fibonacci numbers always starts from 0 followed by 1. The third number is addition of that 0 and 1

0 1 -> these 2 are fixed
0 1 1 -> last 1 is addition of 0 and 1

We calculate the fib from 2nd index and go until n
*/

console.log("Approach 1 - Using extra space - Time O(N), Space O(N)");
const fibApproach1 = (n) => {
  const helperArray = [0, 1];

  for (let i = 2; i <= n; i++) {
    const sum =
      helperArray[helperArray.length - 1] + helperArray[helperArray.length - 2];
    helperArray.push(sum);
  }
  return helperArray[helperArray.length - 1];
};

console.log(fibApproach1(6));

console.log("------------------------");

console.log("Approach 2 - Optimized loop");

const fibApproach2 = (n) => {
  let num1 = 0; // 1 // 1 // 2
  let num2 = 1; // 1 // 2 // 3

  for (let i = 2; i <= n; i++) {
    const sum = num1 + num2;
    num1 = num2;
    num2 = sum;
  }
  return num2;
};

console.log(fibApproach2(6));

console.log("------------------------");

console.log("Approach 2 - Recursive fib");

const fibRecursive = (n) => {
  if (n === 0 || n === 1) {
    return n;
  }
  const fib = fibRecursive(n - 1) + fibRecursive(n - 2);
  return fib;
};

console.log(fibRecursive(6));

/*
Dosa - 50
Idli - 40

Poori - 10

Today's total amount - 90

New amount payable/ New amount  - 10

Overpaid - 0
Balance - 
Total Amount - 100



*/
