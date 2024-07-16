/*

Problem Statement: Given two integers N1 and N2, find their greatest common divisor.
The Greatest Common Divisor of any two integers is the largest number that divides both integers.

Example 1:
Input:N1 = 9, N2 = 12                
Output:3
Explanation:Factors of 9: 1, 3 and 9
Factors of 12: 1, 2, 3, 4, 6, 12
Common Factors: 1, 3 out of which 3 is the greatest hence it is the GCD.

Example 2:
Input:N1 = 20, N2 = 15                
Output: 5
Explanation:Factors of 20: 1, 2, 4, 5
Factors of 15: 1, 3, 5
Common Factors: 1, 5 out of which 5 is the greatest hence it is the GCD.

*/

// BRUTEFORCE APPROACH
const findGcd = (n1, n2) => {
  let gcd = 1;

  const minNumber = Math.min(n1, n2);

  for (let i = 2; i <= minNumber; i++) {
    if (n1 % i === 0 && n2 % i === 0) {
      gcd = i;
    }
  }
  return gcd;
};

// console.log(findGcd(10, 15));

// TIME COMP - O(min(n1,n2))

// BRUTEFORCE IMPROVED APPROACH - OPTIMAL BRUTEFORCE

/*
Can we improve the previous approach? YES!
If we are finding GCD from backwards, that means we can simply return that number as soon as 
we find one. We don't have to go further down towards lower numbers when we already found higher
one.
*/

const findGcd2 = (n1, n2) => {
  let gcd = 1;

  const minNumber = Math.min(n1, n2);

  for (let i = minNumber; i > 0; i--) {
    if (n1 % i === 0 && n2 % i === 0) return i;
  }
  return gcd;
};

// console.log(findGcd2(9, 12));
console.log(findGcd2(10, 15));

// TIME COMP - O(min(n1,n2)). Same as previous approach, but this approach would still be better
// compared to previous one as we can eliminate intermediate GCDs. For example, for 9 & 12
// -> If we start from 9 and work downwards, we return when we find first gcd which is 3

// Space is O(1) for both approaches

// SUBTRACTION BASED APPROACH (REMEMBER THIS)

/*
keep subtracting smaller number from larger number until one becomes 0 (while doing this keep small number same). 
The remaining number is the result


gcd(20,15) -> gcd(20-15, 15) = gcd(5,15)
gcd(5,15) -> gcd(5, 15 - 5) = gcd(5, 10)
gcd(5, 10) -> gcd(5, 10-5) = gcd(5, 5)
gcd(5, 5) -> gcd(5-5,5) = gcd(0,5) -> The reamining is 5 which is the result

*/

const gcdSubtractionBased = (n1, n2) => {
  if (n1 - n2 === 0) return n1; // or return n2, both are same

  const min = Math.min(n1, n2);
  const max = Math.max(n1, n2);

  return gcdSubtractionBased(max - min, min);
};

console.log("GCD Subtraction based", gcdSubtractionBased(15, 20));

// DIVISION BASED OPTIMAL APPROACH  (REMEMBER THIS)

/*
This would be similar to subtraction based approach, but is much efficient as we use division here instead of subtraction
Rest all would be same

gcd(20,15) -> gcd(20%15, 15) = gcd(5,15)     // we are taking the remainder in the division, hence we get 20%15=5
gcd(5,15) -> gcd(5, 15%5) = gcd(5, 0) -> So we get the result right here in this step
*/

const gcdDivisionBased = (n1, n2) => {
  const min = Math.min(n1, n2);
  const max = Math.max(n1, n2);

  if (min === 0) return max; // to prevent zero division error
  if (max % min === 0) return min; // or return n2, both are same

  return gcdDivisionBased(max % min, min);
};

console.log("GCD Division based", gcdDivisionBased(15, 20));
