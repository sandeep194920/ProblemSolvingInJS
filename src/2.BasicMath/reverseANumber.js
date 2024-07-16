/*
Example 1:
Input:N = 12345
Output:54321
Explanation: The reverse of 12345 is 54321.

Example 2:
Input:N = 7789
Output: 9877
Explanation: The reverse of number 7789 is 9877.
*/

const reverseNumber = (n) => {
  if (typeof n !== "number") {
    return "Invalid input";
  }
  /*

    12345 % 10  ->  5
    1234 % 10  -> 4
    123 % 10 -> 3
    12 % 10 -> 2
    1 % 10 -> 1

    1st time you get reverse number as 5
    2nd time you get reverse number as 4, but you need to use that 5 above and make it 54
    3rd time you get reverse number as 3, but you need to use that 54 above and make it 543
    and so on
   */

  let lastDigit = 0;
  let reverse = 0;

  while (n > 0) {
    lastDigit = n % 10; // first time 5, next time 4 and so on
    reverse = reverse * 10 + lastDigit; // first time 5, next time 54 and so on
    n = Math.floor(n / 10); // keep reducing the number
  }
  return reverse;
};

const isPalindrome = (n) => {
  const res = reverseNumber(n);
  return res === n;
};

console.log(reverseNumber(192));
console.log(isPalindrome(88));
