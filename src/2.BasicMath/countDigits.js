/*
Example 1:
Input:N = 12345
Output:5
Explanation:  The number 12345 has 5 digits.

Example 2:
Input:N = 7789
Output: 4
Explanation: The number 7789 has 4 digits.
*/

/*
100

100/10 -> 10 -> 1
10/10 -> 1 -> 2
1/10 -> 0 -> 3


*/

/* 
Approach 1

TIME COMPLEXITY - O(Log10 N) 
SPACE - O(1)

*/
const countUsingDivision = (n) => {
  let count = 0;
  let digits = n;

  if (n === 0) return 1; //edge case

  while (digits > 0) {
    digits = Math.floor(digits / 10);
    count++;
  }
  return count;
};
console.log("-------APPROACH1-------------");
console.log(countUsingDivision(12345));
console.log(countUsingDivision(1));
console.log(countUsingDivision(0));

/* 
Approach 2
OPTIMAL APPROACH 
Time and Space - O(1)

Bit smarter way

LOGIC - When log10 is applied on any number, it calculates how many times 
that number is divisible by 10 without us dividing it manually
*/

const countUsingLog10 = (n) => {
  if (n === 0) return 1;
  return Math.floor(Math.log10(n)) + 1;
};

console.log("-------APPROACH2-------------");
console.log(countUsingLog10(12345));
console.log(countUsingLog10(1));
console.log(countUsingLog10(0));
