/* Rearrange Array Elements by Sign

* Variety-1

Problem Statement:

There’s an array ‘A’ of size ‘N’ with an equal number of positive and negative elements. Without altering the relative order of positive and negative elements, you must return an array of alternately positive and negative values.

Note: Start the array with positive elements.

Example 1:

Input:
arr[] = {1,2,-4,-5}, N = 4
Output:
1 -4 2 -5

Explanation: 

Positive elements = 1,2
Negative elements = -4,-5
To maintain relative ordering, 1 must occur before 2, and -4 must occur before -5.

Example 2:
Input:
arr[] = {1,2,3,-1,-2,-3}, N = 6
Output:
1 -3 2 -1 3 -2
Explanation: 

Positive elements = 1,2,3
Negative elements = -3,-1,-2
To maintain relative ordering, 1 must occur before 2, and 2 must occur before 3.
Also, -3 should come before -1, and -1 should come before -2.

*/

/*
Approach 1 - BRUTE FORCE - O(N + N/2), Space - O(N)

1, 2, 3, -1, -2, -3
This should be transformed into 
1, -2, 3, -1, 2, -3
                       
1,2,-4,-5
This should become
1 -4 2 -5


1 4 6 9 10 -7 -5 -2 -1 -9
should become
1 -7 4 -5 6 -2 9 -1 10 -9
*/

/*
One way we could solve this is by using two traversals. First traversal is to put positive nums in alternating positions. 
Then do the same with -ve nums starting at odd position

1 4 6 9 10 -7 -5 -2 -1 -9

1st pass

index     0  1  2  3  4  5  6  7  8
elements  1     4     6     9     10

2nd pass

index     0   1  2   3   4   5   6   7   8
elements  1  -7  4  -5   6  -2   9  -1  10



OR ANOTHER VARIATION if we need to alter in same array

- Other approach would be to take 2 arrays, one for +ves and one for -ves. 
- Traverse and put into respective arrays
- After start putting it back alternatively.


Time -> O(N) for traversal and O(N/2) to put them back since we are using two arrays at once to put it back.
Space - O(N)
*/

const input1 = [1, 4, 6, 9, 10, -7, -5, -2, -1, -9];

const brute1 = (arr) => {
  const result = new Array(arr.length);

  //  1,    4     6     9     10
  //  [x, x, x, x, x, x, x, x, x, x]

  // Arr len -> 10

  for (let positiveNums = 0; positiveNums < arr.length / 2; positiveNums++) {
    //  2*i -> 0, 2, 4, 6, 8
    result[2 * positiveNums] = arr[positiveNums];
  }

  for (let negativeNums = 0; negativeNums < arr.length / 2; negativeNums++) {
    result[2 * negativeNums + 1] = arr[negativeNums + arr.length / 2];
  }

  return result;
};

console.log("Approach 1 - Brute-force", brute1(input1));
console.log("Time comp - O(N/2 * 2) = O(N), Space O(N)");
console.log("------------------------------------------");

// Brute Approach 2

/*
Adding positives to one array and negatives to another
*/

const brute2 = (arr) => {
  const positives = [],
    negatives = [];
  for (let i = 0; i < arr.length / 2; i++) {
    positives.push(arr[i]);
  }

  for (let i = arr.length / 2; i < arr.length; i++) {
    negatives.push(arr[i]);
  }

  for (let i = 0; i < arr.length / 2; i++) {
    arr[2 * i] = positives[i];
    arr[2 * i + 1] = negatives[i];
  }

  return arr;
};

console.log(brute2(input1));

// Optimal Approach - Time O(N), Space O(1)

/*

- Run a for loop from 0 to arr.length
- This means we take an extra array to store result
- Initialize starting indices for positive and negative numbers -> posIndex = 0, negIndex = 1
 - As i traverses in for loop, if the number is positive, store the ith number is posIndex, and increment this posIndex by 2
 - As i traverses in for loop, if the number is negative, store the ith number is negIndex, and increment this negIndex by 2
    

                        i
arr = [1, 4, 6, 9, 10, -7, -5, -2, -1, -9];

           
                 n
      0   1  2   3  4   5  6   7   8   9
     [1, -7, 4, -5, 6, -2, 9, -1, 10, -9]
                                   p

posIndex = 0 -> 2 -> 4 -> 6 -> 8
negIndex = 1 -> 3 -> 5 -> 7 -> 9
*/

const optimalPosNegPointers = (arr) => {
  let posIndex = 0,
    negIndex = 1;
  const arrangedArray = new Array(arr.length);

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      arrangedArray[posIndex] = arr[i];
      posIndex += 2;
    } else {
      arrangedArray[negIndex] = arr[i];
      negIndex += 2;
    }
  }
  return arrangedArray;
};

console.log("Approach 3 - Optimal", optimalPosNegPointers(input1));
console.log("Time comp - O(N), Space O(N)");
console.log("------------------------------------------");

//--------------------------------------------------

// * Variety-2
/*
 Problem Statement: There’s an array ‘A’ of size ‘N’ with positive and negative elements (not necessarily equal). 
 Without altering the relative order of positive and negative elements, you must return an array of alternately positive and negative values. The leftover elements should be placed at the very end in the same order as in array A.

Note: Start the array with positive elements.

Example 1:

Input:
arr[] = {1,2,-4,-5,3,4}, N = 6
Output:
1 -4 2 -5 3 4

Explanation: 

Positive elements = 1,2
Negative elements = -4,-5
To maintain relative ordering, 1 must occur before 2, and -4 must occur before -5.
Leftover positive elements are 3 and 4 which are then placed at the end of the array.

Example 2:
Input:
arr[] = {1,2,-3,-1,-2,-3}, N = 6
Output:
1 -3 2 -1 3 -2
Explanation: 

Positive elements = 1,2
Negative elements = -3,-1,-2,-4
To maintain relative ordering, 1 must occur before 2.
Also, -3 should come before -1, and -1 should come before -2.
After alternate ordering, -2 and -4 are left, which would be placed at the end of the ans array.

*/

const input2 = [1, 2, -4, -5, 3, 4];

const varitey2 = (arr) => {
  const pos = [],
    neg = [],
    arranged = [];

  for (let ch of arr) {
    ch > 0 ? pos.push(ch) : neg.push(ch);
  }

  const iterationLength = Math.min(pos.length, neg.length);

  for (let i = 0; i < iterationLength; i++) {
    arranged[2 * i] = pos[i];
    arranged[2 * i + 1] = neg[i];
  }

  if (pos.length > neg.length) {
    arranged.push(...pos.slice(iterationLength));
  } else if (neg.length > pos.length) {
    arranged.push(...neg.slice(iterationLength));
  }
  return arranged;
};

console.log("Variety 2 - Optimal", varitey2(input2));
console.log("Time comp - O(N), Space O(N)");
console.log("------------------------------------------");
