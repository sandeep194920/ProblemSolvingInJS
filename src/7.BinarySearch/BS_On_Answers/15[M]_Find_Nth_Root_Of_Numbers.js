/* 
Nth Root of a Number using Binary Search

Problem Statement: Given two numbers N and M, find the Nth root of M. The nth root of a number M is defined as a number X when raised to the power N equals M. If the 'nth root is not an integer, return -1.

Example 1:
Input Format:
 N = 3, M = 27
Result:
 3
Explanation:
 The cube root of 27 is equal to 3.

Example 2:
Input Format:
 N = 4, M = 69
Result:
 -1
Explanation:
 The 4th root of 69 does not exist. So, the answer is -1.

*/

/* 


For squareroot we did

100 

1 * 1 === 100? No -> Continue for next num
2 * 2 === 100? No
3* 3
4* 4
5* 5
6*6 
7*7
8*8
9*9
10*10
11*11==




For N we do

number = 100, N = 3. We are trying to find cube root of 100. 

1 * 1 * 1-> 1
2 * 2 * 2-> 8
3 * 3 * 3->27
4 * 4 * 4-> 64
5*5*5

For how many numbers we need to run the loop? 


The moment we find x * x * x greater than the actual number, that means we can reduce high pointer. No need to continue.
When we find x * x * x to be equal to number we return that.

If we don't find x * x * x to be equal to number at all and the product is always less than the number that means the product 
is very low compared to our number so we can increase the low.


*/

const findNthRoot = (num, N) => {
  let low = 0,
    high = num,
    nthRoot = 0;
  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2);

    if (poweredNumber(mid, N, num) === 2) {
      high = mid - 1;
    } else if (poweredNumber(mid, N, num) === 0) {
      nthRoot = mid;
      low = mid + 1;
    } else if (poweredNumber(mid, N, num) === 1) {
      return mid;
    }
  }
  return nthRoot;
};

const poweredNumber = (number, powerTimes, target) => {
  let numberPowered = 1;

  for (let i = 0; i < powerTimes; i++) {
    numberPowered *= number;
    if (numberPowered === target) return 1;
    if (numberPowered > target) return 2; // meaning, we already exceeded the number we are looking for. So we just return 2 and if it is 2 then reduce high pointer above.
  }
  return 0;
};

console.log("For 3rd root of number 216 is,", findNthRoot(216, 3)); //
