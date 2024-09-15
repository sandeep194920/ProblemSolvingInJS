/*
Example 1:
Input Format: N = 3, k = 5, array[] = {2,3,5}
Result: 2
Explanation: The longest subarray with sum 5 is {2, 3}. And its length is 2.

Example 2:
Input Format: N = 5, k = 10, array[] = {2,3,5,1,9}
Result: 3
Explanation: The longest subarray with sum 10 is {2, 3, 5}. And its length is 3.
*/

/* 
* There are 4 approaches to solve this problem
- Brute-force - Time O(N^3), Space O(1)
- Improved Brute-force - Time O(N^2), Space O(1)
- [Optimal] Hashing (Prefix Sum) - Time O(N), Space - O(N)
- [Optimal only for positives (doesn't work for negatives)] - Time O(N), Space O(1)
*/

// *Approach 1 - Brute-force - O(N^3)

/*
- We need to find all subarrays, and pick the max length out of it.
- Finding subarrays as follows:
   j
   2,3,5,1,9
   i
- Initally, i and j points to same thing. We get subarray of first element. 
- Then j moves to right and we get subarray of i till j like this
     j
   2,3,5,1,9
   i
- Then j moves further and we get subarray of i till j, and so on
       j
   2,3,5,1,9
   i

So the idea is to iterate from i till j everytime. The i runs from 0 to arr length. And j starts
everytime from i and moves 1 by 1 till end. For example, once j moves till end, then i is incremented
and j starts from i like this

         j
   2,3,5,1,9
   i
   k
k is used as inner most loop for running from i to j

sum = 0 -> 2 -> 2 -> 5 -> 0 -> 2 -> 5 -> 10
*/

// k is already used in the inner loop, so I will take k as targetSum
const approach_1_brute_force = (arr, targetSum) => {
  let maxLen = 0;
  let sum;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      sum = 0;
      for (let k = i; k <= j; k++) {
        sum += arr[k];
      }
      if (sum === targetSum) {
        maxLen = Math.max(j - i + 1, maxLen);
      }
    }
  }
  return maxLen;
};

console.log(
  "Approach 1 - ([2, 3, 5, 1, 9], 10) - Brute",
  approach_1_brute_force([2, 3, 5, 1, 9], 10)
);

console.log("--------------------------------------------");

// *Approach 2 - Improved Brute-force - O(N^2)

/*
Similar to above approach but not using k here. The difference between this and above approach
- In the above approach, as j moves every element, the distance between i and j increased by 1. We use k to traverse that and find sum.
- In this appraoch, as j moves every element, we calculate sum using j and check if sum is equal to target. 
We don't recompute sum (using k) from the beginning for every j move as we do above

   j
   2,3,5,1,9
   i

               (ml)
sum = 2 -> 5 -> 10 -> 11 -> 20
ml = 3
*/

const approach_2_improved_brute = (arr, targetSum) => {
  let maxLen = 0;
  for (let i = 0; i < arr.length; i++) {
    let sum = 0;
    for (let j = i; j < arr.length; j++) {
      sum += arr[j];
      if (sum === targetSum) {
        maxLen = Math.max(maxLen, j - i + 1);
      }
    }
  }
  return maxLen;
};

console.log(
  "Approach 2 - ([2, 3, 5, 1, 9], 10) - Brute Improved",
  approach_2_improved_brute([2, 3, 5, 1, 9], 10)
);

console.log("--------------------------------------------");

// *Approach 3 (Optimal time - Hashing) - Prefix Sum - O(N)
// * This is the optimal possible approach for negative numbers as well. For negative numbers, the approach 4 doesn't work

/*
Here's the idea. This prefix sum approach would help you solve many problems:

- Look at index 4. From index 3 to 4, the sum is 10 which is targetSum. Note: No other elements add up to 10 here (slighly changed input compared to previous examples)

Index   0  1  2  3  4
        2, 3, 6, 1, 9

- We realize that the sum from 3 to 4 is 10 = targetSum only when we reach 4 and subtract
ALL ELEMENTS' SUM from 0 to 2. But the questions are:

 - How do we know that we need to consider we have to subtract all elements from 0 to 2 and add only index 3 and 4 only to get targetSum
 
              👇    👇
Index   0  1  2  3  4
        2, 3, 6, 1, 9

 - For this we use prefix sum. Meaning we need to add sum of previous elements to current element at 
 every index. 


Index         0  1  2  3  4

arr           2, 3, 6, 1, 9

Sum at        2  5 11 12 21
every index        

* - Now, let's say we are at index 4 as we did in step 2. The sum here is 21, and we subtract 10 which is target sum,
* we get 11 which is at index 2. Then we check if this 11 is present as sum of all elements at any point (in hashmap), and
* if yes, that means the current index - 11th index gives us the maxLength of elements

* Also, another thing to consider is, let's say if targetSum is 11. We get it in first 3 elements only. So at any point, 
* if sum adds up to targetSum straight away, we need to also calculate maxLength there

? SUMMARY OF PREFIX SUM

- Loop from beginning, and while traversing, do these:
 - Sum the elements with previous ones
   - Everytime, check if currentSum === targetSum. If yes then that would be the candidate for maxLen calculation
   - Everytime check if currentSum - targetSum result exists in hashmap
     - If yes, then it will be a candidate for maxLen calculation
   - Add currentSum as key and index as value in any case to hashmap

?Prefix Sum - The overall idea is to use a hashmap to store all previous sums at any index
?and store that sum(key) and index(value) in the hashmap, and use that to figure of maxLen

*/

const approach_3_prefix_sum = (arr, targetSum) => {
  let sum = 0,
    maxLen = 0,
    hashmap = {};
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    /*
hm = {
 1 : 1,
 3 : 3,
 5 : 4
}

*/
    if (sum === targetSum) {
      maxLen = Math.max(maxLen, i + 1); // i + 1 is what gives the right index and length
    }

    const difference = sum - targetSum;

    if (difference in hashmap) {
      // please don't do if(hashmap[difference]). This could cause false when hashmap[difference] gives you 0
      maxLen = Math.max(maxLen, i - hashmap[difference]);
    }

    // hashmap[sum] = i; // added below inside the if condition, so it works if array exists 0s.

    // if we don't do this check, then the hashmap[sum] gets added if it matches 0s exists in array.
    // So removing this doesn't work for array containing 0s. Try it yourself

    // Try arr = [1, 2, 0, 0, 6] targetSum = 6. We should ideally get 4 (from index 1 to 4)

    if (!(sum in hashmap)) {
      hashmap[sum] = i;
    }
  }
  //   console.log("Hashmap", hashmap);

  return maxLen;
};

console.log(
  "Approach 3 - ([2, 3, 6, 1, 9], 10) - Prefix Sum",
  approach_3_prefix_sum([2, 3, 6, 1, 9], 10)
);

console.log(
  "Approach 3 - ([1, 2, 6, 6, 2, 7], 16) - Prefix Sum",
  approach_3_prefix_sum([1, 2, 6, 6, 2, 7], 16)
);

// console.log(
//   "Approach 3 - ([1, 2, 0, 0, 6], 6) - Prefix Sum",
//   approach_3_prefix_sum([1, 2, 0, 0, 6], 6) // replace 6 with 5 and see you should get 2
// ); // should give you 4

console.log("--------------------------------------------");

// *Approach 4 (Optimal time and space - Only for positives and 0s - Doesn't work for negatives) - 2 pointer sliding window
// *Time O(N), Space O(1)

/*
         i
index    0  1  2  3  4
array    2, 3, 5, 1, 9
               j

ts = 10            

sum < ts j++

sum = 0 -> 2 -> 5 -> 10 -> 11 -> 9 -> 18 -> 15 -> 10


sum = 0 -> 2 -> 5 -> 10

mws = 0 -> 3 

*/

const approach_4_sliding_window = (arr, targetSum) => {
  let mws = 0,
    sum = 0,
    i = 0,
    j = 0;

  //? 1st WAY TO IMPLEMENT WHILE LOOP
  /* REMOVE THIS LINE TO RUN BELOW CODE
  while (j < arr.length) {
    sum += arr[j];

    if (sum < targetSum) {
      j++;
    }

    if (sum === targetSum) {
      mws = Math.max(mws, j - i + 1);
      j++;
    }

    if (sum > targetSum) {
      while (sum > targetSum) {
        sum -= arr[i];
        i++;
      }
      if (sum === targetSum) {
        mws = Math.max(mws, j - i + 1);
      }
      j++;
    }
  }
  return mws;
     REMOVE THIS LINE TO RUN ABOVE CODE */

  //? 2nd WAY TO IMPLEMENT WHILE LOOP - Identified above redundancy and made it better

  /* REMOVE THIS LINE TO RUN BELOW CODE
  while (j < arr.length) {
    sum += arr[j];

    if (sum < targetSum) {
      j++;
    }

    if (sum >= targetSum) {
      while (sum > targetSum) {
        sum -= arr[i];
        i++;
      }
      if (sum === targetSum) {
        mws = Math.max(mws, j - i + 1);
      }
      j++;
    }
  }
  return mws;
    REMOVE THIS LINE TO RUN ABOVE CODE */

  //? 3rd WAY TO IMPLEMENT WHILE LOOP - Here first increment j and then calculate sum if sum < target. This is because we add first position's element to sum before even entering the loop and then increment j unlike other 2 approaches above.
  // ? In the above 2 approaches, we used to first calculate sum and then increment j

  //   /* REMOVE THIS LINE TO RUN BELOW CODE
  sum = arr[0];
  while (j < arr.length) {
    while (sum > targetSum) {
      sum -= arr[i];
      i++;
    }
    if (sum === targetSum) {
      mws = Math.max(mws, j - i + 1);
    }
    j++;
    if (j < arr.length) {
      sum += arr[j];
    }
  }
  return mws;

  //    REMOVE THIS LINE TO RUN ABOVE CODE */
};

console.log(
  "Approach 4 - ([2, 3, 5, 1, 9], 10) - Sliding window",
  approach_4_sliding_window([2, 3, 5, 1, 9], 10)
);

/*

* NOTE : The 4th approach doesn't work for negative numbers. So we better go with 3rd optimal approach for negatives.

Consider an example here to prove why this doesn't work for negatives

     i  
  0  1   2  3  4
 [1, 2, 1, 0, -1]
           j

targetSum = 3 -> from start to end we get the ideal mws, but in this case we dont
sum = 0 -> 1 -> 3 -> 4 -> 3 -> 3 -> 2
mws = 2

*/
