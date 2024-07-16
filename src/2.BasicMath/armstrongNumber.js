/*

Example 1:
Input:N = 153
Output:True
Explanation: 13+53+33 = 1 + 125 + 27 = 153

Example 2:
Input:N = 371
Output: True
Explanation: 33+53+13 = 27 + 343 + 1 = 371

---------


153 -> 153%10 -> 3 -> 3^3 = 9 store this in result
then do 153/10 -> 15. Do the same 15%10 -> 5 -> 5^3 store this in result + prev_result and so on
*/

const isArmstrongNumber = (num) => {
  let result = 0; // 27 + 125 +
  let endDigit = 0;
  let n = num;

  while (n > 0) {
    endDigit = n % 10; // 1%10 = 1
    result += endDigit ** 3; // 27 + 125 + 1
    n = Math.floor(n / 10); // 1
  }
  return result === num;
};

console.log(isArmstrongNumber(153));

// --------
