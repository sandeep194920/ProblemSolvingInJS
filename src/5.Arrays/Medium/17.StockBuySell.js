/* 
Problem Statement: You are given an array of prices where prices[i] is the price of a given stock on an ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

Example 1:
Input:
 prices = [7,1,5,3,6,4]
Output:
 5
Explanation:
 Buy on day 2 (price = 1) and 
sell on day 5 (price = 6), profit = 6-1 = 5.

Note
: That buying on day 2 and selling on day 1 
is not allowed because you must buy before 
you sell.

Example 2:
Input:
 prices = [7,6,4,3,1]
Output:
 0
Explanation:
 In this case, no transactions are 
done and the max profit = 0.
*/

/*
Approach 1 - Brute-force approach - Time O(N^2), Space O(1)

         i
[7,  1,  5,  3,  6,  4]
                     j
maybe i dont need profit variable. Just maxProfit should be good. So just for tracing purpose taking it.
profit -> 0 -> 4 -> 2 -> 5 -> 3 -> 1 
 
maxProfit -> 0 -> 4 -> 5        
*/

const input1 = [7, 1, 5, 3, 6, 4];
const input2 = [7, 6, 4, 3, 1];

console.log("Approach 1 - BruteForce - Time O(N^2), Space O(1)");

const bruteForce = (arr) => {
  let maxProfit = 0;
  for (let currentDay = 0; currentDay < arr.length; currentDay++) {
    for (let futureDay = currentDay + 1; futureDay < arr.length; futureDay++) {
      maxProfit = Math.max(maxProfit, arr[futureDay] - arr[currentDay]);
    }
  }
  return maxProfit;
};

console.log(`For [${input1}], the profit is, ${bruteForce(input1)}`);
console.log(`For [${input2}], the profit is, ${bruteForce(input2)}`);

console.log("------------------------------------------------");

/*
Approach 2 - Two pointer approach - Time O(N), Space O(1)

 i
[7,  1,  5,  3,  6,  4]
     j

- When we start here with i at 0 and j at 1, we notice that if we sell on day j 1 then we lose. So it is better to buy on this day.
- So we move our i to j, and j further until we find a profit. Once we find the profit we put that into max profit.


     i
[7,  1,  5,  3,  6,  4]
         j

maxProfit = 0 -> 4



     i
[7,  1,  5,  3,  6,  4]
                     j

maxProfit = 0 -> 4 -> 5


- So in short, we update i when we find a loss. For example, here below we update i to 0 because we find arr[j] - arr[i] which is 
0 - 1 to be loss, so we update i to new i, and j will continue from next index.

     i          new i
[7,  1,  5,  3,  0,  10]
                 j

*/

console.log("Approach 2 - Two pointer - Time O(N), Space O(1)");

/*

 i
[7,  1,  5,  3,  6,  4]
     j
*/
const twoPointer = (arr) => {
  let maxProfit = 0,
    currentDay = 0,
    futureDay = 1;

  while (futureDay < arr.length) {
    if (arr[futureDay] - arr[currentDay] < 0) {
      currentDay = futureDay;
    } else {
      maxProfit = Math.max(maxProfit, arr[futureDay] - arr[currentDay]);
    }
    futureDay++;
  }
  return maxProfit;
};

console.log(`For [${input1}], the profit is, ${twoPointer(input1)}`);
console.log(`For [${input2}], the profit is, ${twoPointer(input2)}`);
console.log("------------------------------------------------");

// Approach 2.1 - Two pointer approach using for loop

/*
minPrice = Infinity -> 7 -> 1

maxProfit = 0 -> 0 -> 4 -> 5
 

                  i
 [7,  1,  5,  3,  6,  4]


*/
const twoPointerUsingFor = (arr) => {
  let maxProfit = 0,
    minPrice = Infinity; // or can be first element in the array

  for (let i = 0; i < arr.length; i++) {
    minPrice = Math.min(minPrice, arr[i]);
    maxProfit = Math.max(maxProfit, arr[i] - minPrice);
  }
  return maxProfit;
};
