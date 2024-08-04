/*
Example 1:
Input: N=5
Output: 15
Explanation: 1+2+3+4+5=15

Example 2:
Input: N=6
Output: 21
Explanation: 1+2+3+4+5+6=15
*/

const sumOfNNumbers = (n) => {
  if (n === 1) return 1;
  return n + sumOfNNumbers(n - 1); // if it was return 1 + sum(n - 1) then it is as good as counting n
};

const num = 5;
console.log(`Sum of ${num} numbers is ${sumOfNNumbers(num)}`);

/*
TRACE
for n = 5

sum(1) returns 1 to previous step's sum(1)
sum(2)   -> 2 + sum(1)        = 2 + 1 = returns 3
sum(3)   -> 3 + sum(2)        = 3 + 3 = returns 6
sum(4)   -> 4 + sum(3)        = 4 + 6 = returns 10
sum(5)   -> 5 + sum(4)        = 5 + 10 = finally returns 15
*/
