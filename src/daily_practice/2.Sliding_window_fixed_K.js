/*
Find maximum sum of k size subArray. 

This is the fixed window size problem where k is given. Note: If we had to calc k then it is variable window size problem.
(See Aditya verma sliding window problems)

a = [1, 2, 3, 1, 3, 4], k = 3 -> window size

w1 = 1 + 2 + 3 -> 6
w2 = 2 + 3 + 1 -> 6
w3 = 3 + 1 + 3 -> 7
w4 = 1 + 3 + 4 -> 8

w4 has highest sum so 8 is the answer
*/

const findMaxSumInSubArray = (a, k) => {
  let maxSum = 0,
    curSum = 0,
    i = 0,
    j = 0;

  // until window size (j - i + 1) less than or equal to k, we count sum until we reach k
  // once we reach k, we calculate the maxSum

  /*   
                  i
         0  1  2  3  4  5
    a = [1, 2, 3, 1, 3, 4],
                        j

    curSum = 0 -> 1 -> 3 -> 6 -> 5 -> 6 -> 7 -> 4 -> 8
    maxSum = 0 -> 6 -> 7

    */
  while (j < a.length) {
    curSum += a[j];
    if (j - i + 1 < k) {
      j++;
    } else {
      maxSum = Math.max(curSum, maxSum);
      curSum -= a[i];
      i++;
      j++;
    }
  }
  return maxSum;
};

const maxSum = findMaxSumInSubArray([1, 2, 3, 1, 3, 4], 3);
console.log(maxSum);
