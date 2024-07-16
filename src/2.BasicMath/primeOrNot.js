/* Check if  number is prime or not
Example 1:

Input:N = 2
Output:True
Explanation: 2 is a prime number because it has two divisors: 1 and 2 (the number itself).

Example 2:

Input:N =10
Output: False
Explanation: 10 is not prime, it is a composite number because it has 4 divisors: 1, 2, 5 and 10.
*/

/*
We divide the number by every number from 1 until N. If there are only 2 divisors, then the number is prime. If more than 2, then it is not a prime
*/

// BRUTE-FORCE APPROACH

const isPrimeBruteForce = (n) => {
  if (n === 0) return false; // 0 is neither a prime nor a composite number
  let numberOfDivisors = 1;
  for (let i = 2; i <= n; i++) {
    // instead of starting from 1, let's start from 2 as we know for sure that 1 is a divisor, so setting numberOfDivisors to 1
    if (n % i === 0) {
      numberOfDivisors++;
    }
    if (numberOfDivisors > 2) return false;
  }
  return true;
};

// Time complexity - O(N), Space - O(1)

console.log("2 - Is prime, using brute-force, ", isPrimeBruteForce(2));
console.log("5 - Is prime, using brute-force, ", isPrimeBruteForce(5));
console.log("10 - Is prime, using brute-force, ", isPrimeBruteForce(10));

// OPTIMAL APPROACH - REMEMBER APPROACH

/*
This is similar to Optimal approach of finding all divisors.

Example 1 - For N = 10

1 x 10
2 x 5 
5 x 2 (This can be optimized) 
10 x 1 (This can be optimized)

Example 2 - For N = 25

1 x 25
5 x 25
25 x 1

*/

const isPrimeOptimal = (n) => {
  if (n === 0) return false; // 0 is neither a prime nor a composite number
  let numberOfDivisors = 0;
  for (let i = 1; i <= Math.sqrt(n); i++) {
    // instead of starting from 1, let's start from 2 as we know for sure that 1 is a divisor, so setting numberOfDivisors to 1
    if (n % i === 0) {
      numberOfDivisors++;
      if (n / i !== i) {
        numberOfDivisors++;
      }
    }
    if (numberOfDivisors > 2) return false;
  }
  return true;
};

// Time complexity - O(N), Space - O(1)

console.log("2 - Is prime, using square-root, ", isPrimeOptimal(2));
console.log("5 - Is prime, using square-root, ", isPrimeOptimal(5));
console.log("10 - Is prime, using square-root, ", isPrimeOptimal(10));
