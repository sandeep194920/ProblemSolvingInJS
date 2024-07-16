/*
Example 1:
Input:N = 36
Output:[1, 2, 3, 4, 6, 9, 12, 18, 36]
Explanation: The divisors of 36 are 1, 2, 3, 4, 6, 9, 12, 18, 36.

Example 2:
Input:N =12
Output: [1, 2, 3, 4, 6, 12]
Explanation: The divisors of 12 are 1, 2, 3, 4, 6, 12.
*/

/*
BRUTE FORCE - We can take N and divide it by number starting from 1 through N
Which ever number divides N perfectly without remainder then we can add that to the result
*/

const findDivisorsBruteForce = (n) => {
  if (typeof n !== "number") return;

  const divisors = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      divisors.push(i);
    }
  }
  return divisors;
};

console.log("Divisors are, using Bruteforce, ", findDivisorsBruteForce(36));

/*
OPTIMAL APPROACH (REMEMBER!) - Above, we took from 1 - N (all the numbers) and divided N by each number like below. Let's say N = 36
We did

36/1 = 36
36/2 = 18
36/3 and so on. The other way to think of this is, we did 

1 x 36 = 36
2 x 18 = 36
3 x 12 = 36
4 x  9 = 36
6 x  6 = 36
9 x  4 = 36 (repeatition of 4 x 9) - So optimizable
12 x 3 = 36 (repeatition of 3 x 12) - So optimizable
18 x 2 = 36 (repeatition of 18 x 2) - So optimizable
36 x 1 = 36 (repeatition of 1 x 36) - So optimizable

In first approach, pretty much we did this, from 1 to 36(left side). But if you observe, the number we divided by in first approach,
(for example, 36/2 = 18), this 18 is also a divisor. Meaning, we can stop at the middle or sqrt, and then consider both divisors
a x b = 36 (both a and b) as divisors and add them to the result. This would give us a time comp of O(sqrt(N)) which means that, instead of 
iterating 36 times, we iterate it only 6 times
*/

const findDivisorsOptimal = (n) => {
  if (typeof n !== "number") return;

  const divisors = [];

  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      divisors.push(i);
      if (n / i !== i) {
        //   if (!divisors.includes(n / i)) { // we can also check for this, but n / i !== i check is more efficient
        divisors.push(n / i); // example, say i = 2, n = 36. 36/2 which is 18 is also divisible by 36. It's as good as saying 2 x 18 = 36. Here both 2 & 18 are the results.
      }
    }
  }
  return divisors;
};

console.log("Divisors are, using optimal approach, ", findDivisorsOptimal(36));
