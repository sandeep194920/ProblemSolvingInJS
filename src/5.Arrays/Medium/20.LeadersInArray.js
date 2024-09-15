/* 
Leaders in an Array

Problem Statement: Given an array, print all the elements which are leaders. A Leader is an element that is greater than all of the elements on its right side in the array.

Example 1:
Input:

 arr = [4, 7, 1, 0]
Output
:
 7 1 0
Explanation:

 Rightmost element is always a leader. 7 and 1 are greater than the elements in their right side.

Example 2:
Input:

 arr = [10, 22, 12, 3, 0, 6]
Output:

 22 12 6
Explanation:

 6 is a leader. In addition to that, 12 is greater than all the elements in its right side (3, 0, 6), also 22 is greater than 12, 3, 0, 6.
*/

/*
? Problem explanation

Consider - [10, 22, 12, 3, 0, 6]

6 is greater than it's right side because there are no other elements to its right
0 is not greater than 6, so that can't be the answer
3 can't be answer because it has 6 to it's right which is > 3
12 can be the answer because it is greater than all right elements 3, 0, 6
22 can be the answer because it is greater than all right elements 12, 3, 0, 6
10 can't be answer because it has 22 to it's right which is > 10

So the answer is 22, 12, 6. 

*/

// * Approach 1 - Brute-force - Time O(N^2), Space O(1)

/*
- Maintain an array for result
- The last element will always be added to result, so let's add that before hand to the result array
- So lets iterate array from end - 1 to beginning. No need to include end element as we already have added that to result 
- For each element, iterate in the inner loop from last but 1 to that current element and

result [6]


Starting position
                      i 
        0   1   2  3  4  5
arr   [10, 22, 12, 3, 0, 6]
                         j

0 < 6, so not adding it
                   i 
        0   1   2  3  4  5
arr   [10, 22, 12, 3, 0, 6]
                      j 


3 < 6, so not adding it

                i 
        0   1   2  3  4  5
arr   [10, 22, 12, 3, 0, 6]
                   j


12 > 3,0,6 so adding it

            i 
        0   1   2  3  4  5
arr   [10, 22, 12, 3, 0, 6]
                j

22 > 12, 3, 0, 6 so adding it

        i 
        0   1   2  3  4  5
arr   [10, 22, 12, 3, 0, 6]
           j

10 < 22 so not adding it           

*/

const input1 = [10, 22, 12, 3, 0, 6];
const input2 = [4, 7, 1, 0];

const brute = (arr) => {
  const leaders = [arr[arr.length - 1]];

  // we are checking from right side here. We could have also checked from left side as well
  for (let i = arr.length - 2; i >= 0; i--) {
    let isLeader = true;
    for (let j = arr.length - 1; j > i; j--) {
      if (arr[i] < arr[j]) {
        isLeader = false;
        break;
      }
    }

    if (isLeader) {
      leaders.push(arr[i]);
    }
  }

  return leaders;
};

console.log("Approach 1 - Brute - Time O(N^2), Space O(1)");
console.log("For ", input1, "the leaders are", brute(input1)); // 6, 12, 22
console.log("For ", input2, "the leaders are", brute(input2)); // 7, 1, 0

console.log("----------------------------------------------");

// Approach 2

/*
                       
        0   1   2  3  4  5
arr   [10, 22, 12, 3, 0, 6]
           
- Run a loop from end -1 . end element will be the candidate anyways
- Maintain a max variable which holds last element initially indicating, till that point of i that is the highest
- At every element, check if that element is greater than max, if yes that becomes new max and also will be added in leaders
*/

const optimal = (arr) => {
  const leaders = [arr[arr.length - 1]];
  let max = arr[arr.length - 1];

  for (let i = arr.length - 2; i >= 0; i--) {
    if (arr[i] > max) {
      leaders.push(arr[i]);
      max = arr[i];
    }
  }
  return leaders;
};

console.log("Approach 2 - Traverse from end (Optimal) - Time O(N), Space O(N)");
console.log("For ", input1, "the leaders are", optimal(input1)); // 6, 12, 22
console.log("For ", input2, "the leaders are", optimal(input2)); // 7, 1, 0
