/*
Example 1:
Input: Str =  “ABCDCBA”
Output: Palindrome
Explanation: String when reversed is the same as string.

Example 2:
Input: Str = “TAKE U FORWARD”
Output: Not Palindrome
Explanation: String when reversed is not the same as string.
*/

// APPROACH 1 - Loop

/*
ABCDA -> Keep the pointers on first A and last A. The first pointer is left and last one is right. Move left forward and right 
backwards. If left === right or if left > right exit. Till then compare if they both are same and if not return false
*/

console.log("APPROACH 1 - Using WHILE loop");
const isPalindromeUsingWhile = (str) => {
  str = str.toLowerCase();
  let left = 0;
  let right = str.length - 1;

  while (left <= right) {
    if (str.charAt(left) !== str.charAt(right)) {
      return false;
    }
    left++;
    right--;
  }
  return true;
};

console.log(isPalindromeUsingWhile("A"));

console.log("---------------------------------");

console.log("APPROACH 2 - Using FOR loop");

const isPalindromeUsingFor = (str) => {
  str = str.toLowerCase();
  // M A L A Y A L A M - 9
  for (let i = 0; i < Math.floor(str.length / 2); i++) {
    const left = i;
    const right = str.length - 1 - i;
    if (str.charAt(left) !== str.charAt(right)) {
      return false;
    }
  }
  return true;
};

console.log(isPalindromeUsingWhile(""));

console.log("---------------------------------");

console.log("APPROACH 3 - Using RECURSION");

const isPalindromeRecursive = (str) => {
  str = str.toLowerCase();
  if (str.length === 0 || str.length === 1) {
    return true;
  }
  const left = str[0];
  const right = str[str.length - 1];

  if (left !== right) return false;

  return isPalindromeRecursive(str.slice(1, str.length - 1));
};

console.log(isPalindromeRecursive("AB"));

/*
L I R I L

left = L
right = L
check (I R I) -> true

I R I 

left = I
right = I
check (R) -> true

*/
